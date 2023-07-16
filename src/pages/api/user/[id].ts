import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import UserService from "@/services/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      getUser(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const userService = new UserService();
  const users = await userService.getUser(id as string);

  return res.status(200).json(users);
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
