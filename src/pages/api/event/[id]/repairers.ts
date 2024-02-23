import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import { modifyEventRepairerSchema } from "@/schema/event";
import userService from "@/services/user";
import { User } from "@/types";

import prisma from "../../../../lib/prisma";

export default apiHandler({
  get: getRepairer,
  post: createRepairer,
  delete: deleteRepairer
});

interface responseEventRepairer {
  message: string;
}
async function getRepairer(req: NextApiRequest, res: NextApiResponse<User[]>) {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new ApiError(HttpStatusCode.BadRequest, "Invalid id");
  }

  const event = await prisma.event.findUnique({
    where: { id: id }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const repairers = await prisma.eventRepairer.findMany({
    where: {
      eventId: id
    }
  });
  if (!repairers) {
    throw new ApiError(HttpStatusCode.NotFound, "Repairers not found");
  }

  const staff = await userService.getUsers(
    repairers.map((repairer) => repairer.userId)
  );

  const filteredStaff = staff.filter(
    (user): user is User => user !== undefined
  );
  res.status(200).json(filteredStaff);
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

  const responseEndpoint = await prisma.eventRepairer.createMany({
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

async function deleteRepairer(
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

  const responseEndpoint = await prisma.eventRepairer.deleteMany({
    where: {
      userId: {
        in: userId
      },
      eventId: id
    }
  });

  res
    .status(200)
    .json({ message: "Successfully removed volunteers from an event" });
}
