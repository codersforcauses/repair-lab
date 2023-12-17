import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import userService from "@/services/user";
import { User } from "@/types";

export default apiHandler({
  get: getUser
});

async function getUser(req: NextApiRequest, res: NextApiResponse<User>) {
  const userId = req.query.id as string;

  const user = await userService.getUser(userId);

  return res.status(200).json(user);
}
