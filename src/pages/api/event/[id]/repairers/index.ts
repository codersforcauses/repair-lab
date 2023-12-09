import type { NextApiRequest, NextApiResponse } from "next";

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

async function getRepairers(
  req: NextApiRequest,
  res: NextApiResponse<Repairers[]>
) {
  const { id } = req.query;
  const result = await getEventRepairers(id as string);

  res.status(200).json(result);
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
