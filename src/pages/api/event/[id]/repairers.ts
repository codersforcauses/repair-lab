import { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import { EventRepairer } from "@/types";

import prisma from "../../../../lib/prisma";

export default apiHandler({
  post: createRepairer
});

async function createRepairer(req: NextApiRequest, res: NextApiResponse<EventRepairer>) 
{
  const { userId } = req.body;
  const { id } = req.query;
  
  const newEventRepairer = await prisma.eventRepairer.create({
    data: {
      userId: userId as string,
      eventId: id as string
    }
  });
  
  res.status(200).json(newEventRepairer);
}