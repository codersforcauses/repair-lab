import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { z } from "zod";

import { paginationSchema } from "@/lib/pagination";
import UserService from "@/services/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getUsers(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedQuery = paginationSchema.parse(req.query);

    const userService = new UserService();
    const users = await userService.getMany(parsedQuery);

    return res.status(200).json(users);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.issues });
    }

    return res.status(500).end();
  }
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
