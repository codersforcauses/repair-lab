import type { NextApiRequest, NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs";

import apiHandler from "@/lib/api-handler";

export default apiHandler({
  get: getUsers
});

async function getUsers(_req: NextApiRequest, res: NextApiResponse) {
  const users = await clerkClient.users.getUserList();

  return res.status(200).json(users);
}
