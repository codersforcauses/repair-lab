import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { RepairStatus } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import { modifyEventRepairerSchema } from "@/schema/event";
import userService from "@/services/user";
import { User } from "@/types";

import prisma from "../../../../lib/prisma";

export default apiHandler({
  get: getRepairers,
  post: createRepairer,
  delete: deleteRepairers
});

interface responseEventRepairer {
  message: string;
}

async function createRepairer(
  req: NextApiRequest,
  res: NextApiResponse<responseEventRepairer>
) {
  const { userId, id } = modifyEventRepairerSchema.parse({
    ...req.body,
    ...req.query
  });

  const event = await prisma.event.findUnique({
    where: { id: id }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const userMap = await userService.getUsers(userId);

  const filterEmpty = userMap.filter((user) =>
    user && Object.keys(user).length !== 0 ? user : null
  );

  if (filterEmpty.length === 0) {
    throw new ApiError(HttpStatusCode.NotFound, "Users not found / empty");
  }

  await prisma.eventRepairer.createMany({
    data: userId.map((userId) => ({
      userId: userId as string,
      eventId: id
    })),
    skipDuplicates: true
  });

  res
    .status(200)
    .json({ message: "Successfully added volunteers to an event" });
}

async function getRepairers(req: NextApiRequest, res: NextApiResponse<User[]>) {
  const eventId = z.string().parse(req.query.id);

  // get repairers from table EventRepairer
  const eventRepairers = await prisma.eventRepairer.findMany({
    where: { eventId }
  });

  if (eventRepairers.length === 0) {
    return res.status(200).json([]);
  }

  const userIds = eventRepairers.map((repairer) => repairer.userId);

  // get additional informations like firstName, lastName, email, avatar
  const repairersUsers: Partial<Record<string, User>> =
    await userService.getUserMapFromIds(userIds);

  // Prepare to fetch accepted task counts in parallel
  const countsPromises = userIds.map((userId) =>
    prisma.repairRequest.count({
      where: {
        assignedTo: userId,
        status: RepairStatus.ACCEPTED
      }
    })
  );

  const counts = await Promise.all(countsPromises);

  /* eslint-disable no-console */
  if (Object.keys(repairersUsers).length !== userIds.length) {
    console.error("Mismatch in users from clerk and database");
  }

  const repairers = userIds.map((userId, index) => {
    const userData = repairersUsers[userId];

    return {
      id: userId,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      emailAddress: userData?.emailAddress,
      role: userData?.role,
      imageUrl: userData?.imageUrl,
      acceptedTasksCount: counts[index]
    };
  });

  // TODO fix
  res.status(200).json(repairers as User[]);
}

export type EventRepairer = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  acceptedTasksCount: number;
};
async function deleteRepairers(
  req: NextApiRequest,
  res: NextApiResponse<responseEventRepairer>
) {
  const { userId, id } = modifyEventRepairerSchema.parse({
    ...req.body,
    ...req.query
  });

  const event = await prisma.event.findUnique({ where: { id: id } });
  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const userMap = await userService.getUsers(userId);

  const filterEmpty = userMap.filter((user) =>
    user && Object.keys(user).length !== 0 ? user : null
  );
  if (filterEmpty.length === 0) {
    throw new ApiError(HttpStatusCode.NotFound, "Users not found / empty");
  }

  await prisma.eventRepairer.deleteMany({
    where: {
      userId: {
        in: userId
      },
      eventId: id
    }
  });

  res
    .status(200)
    .json({ message: "Successfully deleted volunteers from an event" });
}
