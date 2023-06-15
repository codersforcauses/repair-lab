// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";
import { User } from "@prisma/client";

type Data = User | {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const messages = await prisma.message.findMany({
    where: { content: req.query.content as string }
  });

  res.status(200).json(messages);
}

export const config = {};
