import { z } from "zod";

export type PaginationOptions = z.infer<typeof paginationSchema>;

export interface PaginationResponse<T> {
  items: T[];
  meta: PaginationOptions & {
    totalCount: number;
  };
}

export async function buildPaginationResponse<T>(
  items: T[],
  options: PaginationOptions,
  totalCount: number
): Promise<PaginationResponse<T>> {
  return {
    items: items,
    meta: {
      ...options,
      totalCount
    }
  };
}

const orderByRegex = /^(\+|-)[A-Za-z0-9_]*/;

export const paginationSchema = z.object({
  limit: z
    .preprocess(
      (val) => Number(val),
      z.number().positive({ message: "Limit must be more than 0" })
    )
    .default(10),
  offset: z
    .preprocess(
      (val) => Number(val),
      z.number().nonnegative({ message: "Offset cannot be less than 0" })
    )
    .default(0),
  orderBy: z
    .string()
    .regex(orderByRegex, {
      message:
        "orderBy has to start with either + or - followed by the tablename"
    })
    .default("-created_at"),
  query: z.string().default("")
});
