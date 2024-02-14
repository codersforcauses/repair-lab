/* eslint-disable no-console */

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { getAuth } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";
import { ZodError } from "zod";

import userService from "@/services/user";
import { ErrorResponse } from "@/types";

type Controller = (req: NextApiRequest, res: NextApiResponse) => unknown;
type Permission = UserRole[];
type Handler = {
  controller: Controller;
  permission?: Permission;
};
/**
 * Wrapper for the base Next.js API handler to provide default error handling.
 * @param handler Object containing HTTP methods and its handler.
 * @returns
 */
export default function apiHandler(
  handler: Record<string, Controller | Handler>
): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLowerCase();

    // check handler supports HTTP method
    if (!method || !handler[method]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const permission = (handler[method] as Handler)?.permission;
    if (permission) {
      const { userId } = getAuth(req);
      const role = await userService.getRole(userId as string);
      if (!permission.includes(role as UserRole)) {
        return res.status(403).end("Forbidden");
      }
    }

    try {
      const controller =
        typeof handler[method] === "function"
          ? (handler[method] as Controller)
          : (handler[method] as Handler).controller;
      // run the handler
      await controller(req, res);
    } catch (err) {
      errorHandler(err, res);
    }
  };
}

function errorHandler(err: unknown, res: NextApiResponse<ErrorResponse>) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.errors });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // default to 500 server error
  console.error(err); // TODO: Could possibly log this somewhere else other than console logging.
  return res.status(500).end();
}
