import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import apiPermission from "@/lib/api-permission";
import { PaginationResponse } from "@/lib/pagination";
import { getManyUsersSchema } from "@/schema/user";
import userService from "@/services/user";
import { User } from "@/types";

export default apiHandler({
  get: {
    controller: getUsers,
    permission: apiPermission["GET /user"]
  }
});

async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse<PaginationResponse<User[]>>
) {
  const parsedQuery = getManyUsersSchema.parse(req.query);

  const users = await userService.getMany(parsedQuery);

  return res.status(200).json(users);
}
