import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Prisma } from "@prisma/client";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import { PaginationResponse } from "@/lib/pagination";
import prisma from "@/lib/prisma";
import { getRepairRequestSchema } from "@/schema/repair-request";
import repairRequestService from "@/services/repairRequest";
import userService from "@/services/user";
import { RepairRequestResponse, SortDirection } from "@/types";

export default apiHandler({
  get: getRepairRequests
});

async function getRepairRequests(
  req: NextApiRequest,
  res: NextApiResponse<PaginationResponse<RepairRequestResponse[]>>
) {
  const {
    id: eventId,
    sortKey = prisma.repairRequest.fields.requestDate.name,
    sortMethod = "asc",
    searchWord,
    itemType,
    itemBrand,
    assignedTo,
    // pagination
    page,
    perPage
  } = getRepairRequestSchema.parse(req.query);

  const findUnassigned =
    assignedTo?.length == 1 && assignedTo[0] == "unassigned";

  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const sortObj: Record<string, SortDirection> = {
    [sortKey]: sortMethod
  };

  // Find user ids that match the search
  let userIdList = undefined;
  if (searchWord) {
    const users = await userService.getAll({
      query: searchWord,
      orderBy: "created_at"
    });

    userIdList = users.map((u) => u.id);
  }

  // Query DB
  const where: Prisma.RepairRequestWhereInput = {
    event: { id: eventId as string },
    // Need to pass undefined directly to the OR
    OR: searchWord
      ? [
          { id: { contains: searchWord, mode: "insensitive" } },
          { description: { contains: searchWord, mode: "insensitive" } },
          // Users
          { assignedTo: { in: userIdList } },
          { createdBy: { in: userIdList } }
        ]
      : undefined,
    item: { name: { in: itemType } },
    itemBrand: { in: itemBrand },
    ...(findUnassigned
      ? { assignedTo: "" }
      : { assignedTo: { in: assignedTo } })
  };

  const [repairRequests, totalCount] = await prisma.$transaction([
    prisma.repairRequest.findMany({
      where,
      include: {
        images: true
      },
      orderBy: sortObj,
      // Pagination
      skip: (page - 1) * perPage,
      take: perPage
    }),
    prisma.repairRequest.count({ where })
  ]);

  // Convert to response type
  const repairRequestResponse = await repairRequestService.toClientResponse(
    repairRequests,
    {
      page,
      perPage
    },
    totalCount
  );
  return res.status(200).json(repairRequestResponse);
}
