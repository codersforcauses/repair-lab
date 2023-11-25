import { NextApiRequest, NextApiResponse } from "next";
import { PageConfig } from "next";

import { EventOption } from "@/hooks/events";
import apiHandler from "@/lib/api-handler";
import prisma from "@/lib/prisma";

export default apiHandler({
  get: getEventOptions
});

async function getEventOptions(
  req: NextApiRequest,
  res: NextApiResponse<EventOption[]>
) {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      name: true
    }
  });

  res.status(200).json(events);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
