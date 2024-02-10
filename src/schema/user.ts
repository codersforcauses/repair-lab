import { z } from "zod";

import { paginationSchema } from "@/lib/pagination";

const orderByRegex = /^(\+|-)[A-Za-z0-9_]*/;

export const getManyUsersSchema = z
  .object({
    orderBy: z
      .string()
      .regex(orderByRegex, {
        message:
          "orderBy has to start with either + or - followed by the tablename"
      })
      .default("-created_at"),
    query: z.string().default(""),
    userId: z
      .array(z.string())
      .or(z.string().transform((str) => [str]))
      .optional()
  })
  .merge(paginationSchema);
