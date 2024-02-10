import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import userService from "@/services/user";
import { UserRole } from "@/types";

export default apiHandler({
  get: getUserRole,
  patch: updateUserRole
});

async function getUserRole(
  req: NextApiRequest,
  res: NextApiResponse<{ role: UserRole }>
) {
  const userId = z.string().parse(req.query.id);

  const role = await userService.getRole(userId);

  return res.status(200).json({ role });
}

async function updateUserRole(req: NextApiRequest, res: NextApiResponse) {
  const userId = z.string().parse(req.query.id);
  const { role } = req.body;

  const parsedRole = validateRole(role);

  // only admins can update a user's role
  const { role: updaterRole } = await userService.getAuth(req);

  if (
    updaterRole !== UserRole.ADMIN &&
    process.env.NODE_ENV !== "development"
  ) {
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
