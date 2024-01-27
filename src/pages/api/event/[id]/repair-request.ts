import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Prisma } from "@prisma/client";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import { getRepairRequestSchema } from "@/schema/repair-request";
import repairRequestService from "@/services/repairRequest";
import userService from "@/services/user";
import { RepairRequestResponse, User } from "@/types";

export default apiHandler({
  get: getRepairRequests
});

type RepairRequestWithImages = Prisma.RepairRequestGetPayload<{
  include: { images: true };
}>;

async function getRepairRequests(
  req: NextApiRequest,
  res: NextApiResponse<RepairRequestResponse[]>
) {
  const {
    id: eventId,
    sortKey = prisma.repairRequest.fields.requestDate.name,
    sortMethod = "asc",
    searchWord,
    item,
    brand,
    assignedTo
  } = getRepairRequestSchema.parse(req.query);

  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const sortObj: Record<string, "asc" | "desc"> = {
    [sortKey]: sortMethod
  };

  let repairRequests = await prisma.repairRequest.findMany({
    where: {
      event: { id: eventId as string },
      item: { name: { in: item } },
      itemBrand: { in: brand },
      assignedTo: { in: assignedTo }
    },
    include: {
      images: true
    },
    orderBy: sortObj
  });

  // Filter by search word after initial query so we have user data
  if (searchWord)
    repairRequests = await filterBySearch(searchWord, repairRequests);

  const repairRequestResponse =
    await repairRequestService.toClientResponse(repairRequests);

  return res.status(200).json(repairRequestResponse);
}

/**
 * Filters users by name through search term
 */
const filterBySearch = async (
  search: string,
  repairRequests: RepairRequestWithImages[]
) => {
  const lowercaseSearch = search.toLowerCase();

  // Filter users by the search
  const users = await userService.getMany({
    query: search,
    perPage: 500,
    orderBy: "created_at",
    page: 1
  });
  // Turn users into a record for fast lookup
  const userMap = users.items.reduce(
    (map, user) => {
      map[user.id] = user;
      return map;
    },
    {} as Partial<Record<string, User>>
  );

  return repairRequests.filter(
    (r) =>
      // users
      userMap[r.createdBy] != undefined ||
      userMap[r.assignedTo] != undefined ||
      // other
      r.id.toLowerCase().includes(lowercaseSearch) ||
      r.description.toLowerCase().includes(lowercaseSearch)
  );
};
