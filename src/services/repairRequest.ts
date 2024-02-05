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
  // Single request overload - convert to array
  if (!Array.isArray(repairRequests)) repairRequests = [repairRequests];

  const userIds = repairRequests.flatMap((e) => [e.createdBy, e.assignedTo]);
  const userMap = await userService.getUserMapFromIds(userIds);

  const responses: RepairRequestResponse[] = await Promise.all(
    repairRequests.map(async (req) => {
      const [thumbnailImage, images] = await Promise.all([
        presignImage(req.thumbnailImage),
        presignImages(req.images?.map(({ s3Key }) => s3Key) || [])
      ]);

      let assignedTo = undefined;
      if (req.assignedTo)
        assignedTo =
          userMap[req.assignedTo] ?? userService.unknownUser(req.assignedTo);

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

  // Single request overload
  if (!Array.isArray(repairRequests)) return responses[0];

  // This should never happen
  if (options == undefined || totalCount == undefined)
    throw new Error("Pagination options incorrectly passed.");

  const paginatedResponse = await buildPaginationResponse(
    responses,
    options,
    totalCount
  );

  return paginatedResponse;
}

const repairRequestService = {
  toClientResponse
};

export default repairRequestService;
