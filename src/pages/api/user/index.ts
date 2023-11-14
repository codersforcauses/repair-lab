import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import UserService from "@/services/user";

export default apiHandler({
  get: getUsers
});

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const userService = new UserService();
  const users = await userService.getAll();

  return res.status(200).json(users);
}
