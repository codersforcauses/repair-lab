import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import userService from "@/services/user";
import { ClerkSortOrder } from "@/types";
import { User } from "@/types";

type Repairers = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default apiHandler({
  get: getRepairers
});

async function getRepairers(req: NextApiRequest, res: NextApiResponse) {
  // check if event exists
  const eventId = z.string().parse(req.query.id);
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      eventRepairer: true
    }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  // get event repairers
  try {
    const result = await getEventRepairers(eventId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "failed to get event repairers" });
  }
}

async function getEventRepairers(id: string): Promise<Repairers[]> {
  // get repairers from table EventRepairer
  const repairers = await prisma.eventRepairer.findMany({
    where: { eventId: id }
  });

  if (repairers.length === 0) {
    return [];
  }

  const userId = repairers.map((repairer) => repairer.userId);

  // get additional informations like firstName, lastName, email

  const repairersUsers = await getRepairersUsers(userId);

  // if user is not found in clerk, return just userId
  return userId.map((id) => {
    const user = repairersUsers.find((user) => user.userId === id);
    return {
      userId: id,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? ""
    } as Repairers;
  });
}

async function getRepairersUsers(userId: string[]): Promise<Repairers[]> {
  const userListParams = {
    limit: 500,
    offset: 0,
    orderBy: ClerkSortOrder.DESC_CREATED_AT,
    userId: userId
  };

  const users: User[] = await userService.getUserList(userListParams);

  return users.map((user) => {
    const { id, firstName, lastName, emailAddress } = user;
    return {
      userId: id,
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email: emailAddress ?? ""
    } as Repairers;
  });
}
