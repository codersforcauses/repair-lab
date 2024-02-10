import { z } from "zod";

import { paginationSchema } from "@/lib/pagination";
import { StaffRole } from "@/types";

export const getManyUsersSchema = z
  .object({
    orderBy: z
      .enum([
        "created_at",
        "updated_at",
        "+created_at",
        "+updated_at",
        "-created_at",
        "-updated_at"
      ])
      .default("-created_at"),
    query: z.string().default(""),
    userId: z
      .array(z.string())
      .or(z.string().transform((str) => [str]))
      .optional(),
    role: z.nativeEnum(StaffRole).optional()
  })
  .merge(paginationSchema);
