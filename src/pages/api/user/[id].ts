import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { clerkClient } from "@clerk/nextjs";

import apiHandler from "@/lib/api-handler";

export default apiHandler({
  get: getUser
});

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const user = await clerkClient.users.getUser(id as string);
  return res.status(200).json(user);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
