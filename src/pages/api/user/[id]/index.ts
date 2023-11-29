import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import userService from "@/services/user";
import { User } from "@/types";

export default apiHandler({
  get: getUser
});

async function getUser(req: NextApiRequest, res: NextApiResponse<User>) {
  const { id } = req.query;

  const user = await userService.getUser(id as string);

  return res.status(200).json(user);
}
