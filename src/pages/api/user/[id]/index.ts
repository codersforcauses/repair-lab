import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import apiPermission from "@/lib/api-permission";
import userService from "@/services/user";
import { User } from "@/types";

export default apiHandler({
  get: {
    controller: getUser,
    permission: apiPermission["GET /user/[^/]*"]
  }
});

async function getUser(req: NextApiRequest, res: NextApiResponse<User>) {
  const userId = z.string().parse(req.query.id);

  const user = await userService.getUser(userId);

  if (!user) {
    throw new ApiError(HttpStatusCode.NotFound, "User not found");
  }

  return res.status(200).json(user);
}
