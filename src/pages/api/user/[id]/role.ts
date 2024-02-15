import type { NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import apiPermission from "@/lib/api-permission";
import { NextApiRequestWithUser } from "@/middleware";
import userService from "@/services/user";
import { UserRole } from "@/types";

export default apiHandler({
  patch: {
    controller: updateUserRole,
    permission: apiPermission["PATCH /user/[^/]*/role"]
  }
});

async function updateUserRole(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  const userId = z.string().parse(req.query.id);
  const { role } = req.body;

  const parsedRole = validateRole(role);

  // only admins can update a user's role
  if (req.user?.role !== UserRole.ADMIN) {
    throw new ApiError(
      HttpStatusCode.Unauthorized,
      "Not authorised to update user role"
    );
  }

  await userService.updateRole(userId, parsedRole);

  return res.status(204).end();
}

const validateRole = (role: string) => {
  const roleSchema = z.nativeEnum(UserRole);
  const parsedData = roleSchema.parse(role);

  return parsedData;
};
