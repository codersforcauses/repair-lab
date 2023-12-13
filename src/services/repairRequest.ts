import userService from "@/services/user";
import { RepairRequest, RepairRequestResponse } from "@/types";

const toClientResponse = async (
  repairRequests: RepairRequest[]
): Promise<RepairRequestResponse[]> => {
  const userIds = repairRequests.flatMap((e) => [e.createdBy, e.assignedTo]);

  const userMap = await userService.getUserMapFromIds(userIds);

  const responses: RepairRequestResponse[] = repairRequests.map((req) => {
    return {
      ...req,
      createdBy:
        userMap[req.createdBy] ?? userService.unknownUser(req.createdBy),
      assignedTo:
        userMap[req.assignedTo] ?? userService.unknownUser(req.assignedTo),
      requestDate: req.requestDate.toISOString(),
      updatedAt: req.updatedAt.toISOString(),
      hoursWorked: req.hoursWorked.toNumber()
    };
  });
  return responses;
};

const repairRequestService = {
  toClientResponse
};

export default repairRequestService;
