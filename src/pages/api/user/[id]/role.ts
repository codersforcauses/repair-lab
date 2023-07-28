import type { NextApiRequest, NextApiResponse } from "next";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { z } from "zod";

import UserService from "@/services/user";
import { UserRole } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PATCH":
      updateUserRole(req, res);
      break;
    default:
      return res.status(405).json({
        error: { message: `Method ${req.method} not allowed` }
      });
  }
}

const updateUserRole = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id: userId } = req.query;
    const { role } = req.body;

    validateRole(role, res);

    const userService = new UserService();
    await userService.updateRole(userId as string, role);

    return res.status(204).end();
  } catch (e) {
    if (isClerkAPIResponseError(e)) {
      return res.status(e.status).json({ error: e.message });
    }

    return res.status(500).end();
  }
};

const validateRole = (role: string, res: NextApiResponse) => {
  const roleSchema = z.nativeEnum(UserRole);
  const parsedData = roleSchema.safeParse(role);

  if (!parsedData.success) {
    const { errors } = parsedData.error;
    return res.status(400).json({ error: errors });
  }
};
