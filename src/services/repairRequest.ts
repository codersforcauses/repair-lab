import { RepairRequestImage } from "@prisma/client";

import {
  buildPaginationResponse,
  PaginationOptions,
  PaginationResponse
} from "@/lib/pagination";
import { presignImage, presignImages } from "@/services/s3";
import userService from "@/services/user";
import { RepairRequest, RepairRequestResponse } from "@/types";

type RepairRequestWithImage = RepairRequest & { images?: RepairRequestImage[] };

/**
 * Converts a single RepairRequest to RepairRequestResponse
 * @param repairRequests
 * @returns
 */
async function toClientResponse(
  repairRequest: RepairRequestWithImage
): Promise<RepairRequestResponse>;

/**
 * Converts a RepairRequest list to a RepairRequestResponse list with pagination metadata
 * @param repairRequests
 * @returns
 */
async function toClientResponse(
  repairRequests: Array<RepairRequestWithImage>,
  options: PaginationOptions,
  totalCount: number
): Promise<PaginationResponse<RepairRequestResponse>>;

async function toClientResponse(
  repairRequests: Array<RepairRequestWithImage> | RepairRequestWithImage,
  options?: PaginationOptions,
  totalCount?: number
): Promise<PaginationResponse<RepairRequestResponse> | RepairRequestResponse> {
  // Run conversion on array
  const responses = await convertRequests(
    !Array.isArray(repairRequests) ? [repairRequests] : repairRequests
  );

  // Single request overload
  if (!Array.isArray(repairRequests)) return responses[0];

  // This should never happen
  if (options == undefined || totalCount == undefined)
    throw new Error("Pagination options incorrectly passed.");

  return await buildPaginationResponse(responses, options, totalCount);
}

async function convertRequests(
  repairRequests: RepairRequestWithImage[]
): Promise<RepairRequestResponse[]> {
  const userIds = repairRequests.flatMap((e) => [e.createdBy, e.assignedTo]);
  const userMap = await userService.getUserMapFromIds(userIds);

  return Promise.all(
    repairRequests.map(async (req) => {
      const [thumbnailImage, images] = await Promise.all([
        presignImage(req.thumbnailImage),
        presignImages(req.images?.map(({ s3Key }) => s3Key) || [])
      ]);

      const assignedTo = req.assignedTo
        ? userMap[req.assignedTo] ?? userService.unknownUser(req.assignedTo)
        : undefined;

      return {
        ...req,
        createdBy:
          userMap[req.createdBy] ?? userService.unknownUser(req.createdBy),
        assignedTo,
        requestDate: req.requestDate.toISOString(),
        updatedAt: req.updatedAt.toISOString(),
        hoursWorked: req.hoursWorked.toNumber(),
        thumbnailImage,
        images
      };
    })
  );
}

const repairRequestService = {
  toClientResponse
};

export default repairRequestService;
