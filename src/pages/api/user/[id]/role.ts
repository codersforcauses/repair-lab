import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { getAuth } from "@clerk/nextjs/server";
import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiHandler from "@/lib/api-handler";
import userService from "@/services/user";
import { PrismaUserRole } from "@/types";

export default apiHandler({
  patch: updateUserRole
});

async function updateUserRole(req: NextApiRequest, res: NextApiResponse) {
  const { id: userId } = req.query;
  const { role } = req.body;

  const parsedRole = validateRole(role);

  // only admins can update a user's role
  const { userId: updaterId } = getAuth(req);
  // TODO: move this to a more generic function to check permissions.
  const updaterRole = await userService.getRole(updaterId!);
  if (updaterRole !== PrismaUserRole.ADMIN) {
    throw new ApiError(
      HttpStatusCode.Unauthorized,
      "Not authorised to update user role"
    );
  }

  await userService.updateRole(userId as string, parsedRole);

  return res.status(204).end();
}

const validateRole = (role: string) => {
  const roleSchema = z.nativeEnum(PrismaUserRole);
  const parsedData = roleSchema.parse(role);

  return parsedData;
};
