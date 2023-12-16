import { RepairRequestImage } from "@prisma/client";

import { presignImage, presignImages } from "@/lib/presign-image";
import userService from "@/services/user";
import { RepairRequest, RepairRequestResponse } from "@/types";

/**
 * Converts a list of RepairRequest to RepairRequestResponse
 * @param repairRequests
 * @param withImage If you need the image presigned urls
 * @returns
 */
const toClientResponse = async (
  repairRequests: Array<RepairRequest & { images?: RepairRequestImage[] }>,
  withImage = false
): Promise<RepairRequestResponse[]> => {
  const userIds = repairRequests.flatMap((e) => [e.createdBy, e.assignedTo]);
  const userMap = await userService.getUserMapFromIds(userIds);

  const responses: RepairRequestResponse[] = await Promise.all(
    repairRequests.map(async (req) => {
      const [thumbnailImage, images] = withImage
        ? await Promise.all([
            presignImage(req.thumbnailImage),
            presignImages(req.images?.map(({ s3Key }) => s3Key) || [])
          ])
        : [undefined, []];

      return {
        ...req,
        createdBy:
          userMap[req.createdBy] ?? userService.unknownUser(req.createdBy),
        assignedTo:
          userMap[req.assignedTo] ?? userService.unknownUser(req.assignedTo),
        requestDate: req.requestDate.toISOString(),
        updatedAt: req.updatedAt.toISOString(),
        hoursWorked: req.hoursWorked.toNumber(),
        thumbnailImage,
        images
      };
    })
  );
  return responses;
};

const repairRequestService = {
  toClientResponse
};

export default repairRequestService;
