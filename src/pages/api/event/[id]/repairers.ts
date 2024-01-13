import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import { addEventRepairerSchema } from "@/schema/event";
import userService from "@/services/user";
import { EventRepairer } from "@/types";

import prisma from "../../../../lib/prisma";

export default apiHandler({
  post: createRepairer
});

async function createRepairer(
  req: NextApiRequest,
  res: NextApiResponse<EventRepairer>
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

  const userMap = await userService.getUserMapFromIds(userId as string[]);

  if (!userMap) {
    throw new ApiError(HttpStatusCode.NotFound, "User not found");
  }

  const newEventRepairer = await prisma.eventRepairer.createMany({
    data: userId.map((userId) => ({
      userId: userId as string,
      eventId: id as string
    })),
    skipDuplicates: true
  });

  res.status(200).json(newEventRepairer);
}
