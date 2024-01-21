import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";
import userService from "@/services/user";

export default apiHandler({
  get: getRepairers
});

async function getRepairers(req: NextApiRequest, res: NextApiResponse) {
  const eventId = z.string().parse(req.query.id);
  const result = await getEventRepairers(eventId as string);

  res.status(200).json(result);
}

async function getEventRepairers(id: string) {
  // get repairers from table EventRepairer
  const repairers = await prisma.eventRepairer.findMany({
    where: { eventId: id }
  });

  if (repairers.length === 0) {
    return [];
  }

  const userIds = repairers.map((repairer) => repairer.userId);

  // get additional informations like firstName, lastName, email
  const repairersUsers = await getRepairersUsers(userIds);

  // if user is not found in clerk, return just userId
  return userIds.map((id) => {
    const user = repairersUsers.find((user) => user.userId === id);

    return {
      userId: id,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? ""
    };
  });
}

async function getRepairersUsers(userIds: string[]) {
  const users = await userService.getUserMapFromIds(userIds);

  return Object.values(users).map((user) => ({
    userId: user?.id ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.emailAddress ?? ""
  }));
}
