import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import apiHandler from "@/lib/api-handler";
import UserService from "@/services/user";

export default apiHandler({
  get: getUser
});

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userService = new UserService();
  const users = await userService.getUser(id as string);

  return res.status(200).json(users);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
