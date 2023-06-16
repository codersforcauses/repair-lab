// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "@prisma/client";

import prisma from "../../lib/prisma";

// getMessagesByContent retrieves all messages from the database
// that have the content specified in the query string.
export default async function getMessagesByContent( // you can name this whatever you want
  req: NextApiRequest,
  res: NextApiResponse<Message[]>
) {
  const messages = await prisma.message.findMany({
    where: { content: req.query.content as string }
  });

  res.status(200).json(messages);
}

export const config = {};
