import { z } from "zod";

export type PaginationOptions = z.infer<typeof paginationSchema>;

export interface PaginationResponse<T> {
  items: T[];
  meta: PaginationOptions & {
    totalCount: number;
    lastPage: number;
  };
}

export async function buildPaginationResponse<T>(
  items: T[],
  options: PaginationOptions,
  totalCount: number
): Promise<PaginationResponse<T>> {
  const lastPage =
    totalCount % options.perPage === 0
      ? totalCount / options.perPage
      : Math.floor(totalCount / options.perPage) + 1;

  return {
    items: items,
    meta: {
      ...options,
      totalCount,
      lastPage
    }
  };
}

const orderByRegex = /^(\+|-)[A-Za-z0-9_]*/;

export const paginationSchema = z.object({
  perPage: z
    .preprocess(
      (val) => Number(val),
      z.number().positive({ message: "perPage cannot be less than 1" })
    )
    .default(10),
  page: z
    .preprocess(
      (val) => Number(val),
      z.number().positive({ message: "page cannot be less than 1" })
    )
    .default(1),
  orderBy: z
    .string()
    .regex(orderByRegex, {
      message:
        "orderBy has to start with either + or - followed by the tablename"
    })
    .default("-created_at"),
  query: z.string().default("")
});
