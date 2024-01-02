import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";

import apiHandler from "@/lib/api-handler";
import { EventRepairer } from "@/types";

import prisma from "../../../../lib/prisma";
import userService from "../../../../services/user";

export default apiHandler({
  post: createRepairer
});

async function createRepairer(
  req: NextApiRequest,
  res: NextApiResponse<EventRepairer>
) {
  const { userId } = req.body;
  const { id } = req.query;

  const event = await prisma.event.findUnique({
    where: { id: id as string }
  });

  if (!event) {
    throw new ApiError(HttpStatusCode.NotFound, "Event not found");
  }

  const user = await userService.getUser(userId);

  if (!user) {
    throw new ApiError(HttpStatusCode.NotFound, "User not found");
  }

  const newEventRepairer = await prisma.eventRepairer.create({
    data: {
      userId: userId as string,
      eventId: id as string
    }
  });

  res.status(200).json(newEventRepairer);
}
