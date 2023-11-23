import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import apiHandler from "@/lib/api-handler";
import { paginationSchema } from "@/lib/pagination";
import userService from "@/services/user";

export default apiHandler({
  get: getUsers
});

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const parsedQuery = paginationSchema.parse(req.query);

  const users = await userService.getMany(parsedQuery);

  return res.status(200).json(users);
}

export const config: PageConfig = {
  api: {
    externalResolver: true
  }
};
