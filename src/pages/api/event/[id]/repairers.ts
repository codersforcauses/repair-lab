import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import { addEventRepairerSchema } from "@/schema/event";
import userService from "@/services/user";

import prisma from "../../../../lib/prisma";

export default apiHandler({
  post: createRepairer,
  get: getRepairers
});

interface responseEventRepairer {
  message: string;
}

async function createRepairer(
  req: NextApiRequest,
  res: NextApiResponse<responseEventRepairer>
) {
  const { userId, id } = addEventRepairerSchema.parse({
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

  const responseEndpoint = await prisma.eventRepairer.createMany({
    data: userId.map((userId) => ({
      userId: userId as string,
      eventId: id as string
    })),
    skipDuplicates: true
  });

  res
    .status(200)
    .json({ message: "Successfully added volunteers to an event" });
}

async function getRepairers(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const event = await prisma.event.findUnique({
    where: { id: id as string }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const repairers = await prisma.eventRepairer.findMany({
    where: { eventId: id as string }
  });

  if (!repairers) {
    throw new ApiError(HttpStatusCode.NotFound, "Repairers not found");
  }

  res.status(200).json(repairers);
}
