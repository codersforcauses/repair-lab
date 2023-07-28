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
  try {
  const { id } = req.query;
  const userService = new UserService();
    const user = await userService.getUser(id as string);

    return res.status(200).json(user);
  } catch (e) {
    if (isClerkAPIResponseError(e)) {
      return res.status(e.status).json({ error: e.message });
    }

    return res.status(500);
  }
};

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
