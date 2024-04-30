import { z } from "zod";

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
    .default(1)
});

export type PaginationOptions = z.infer<typeof paginationSchema>;

export interface PaginationResponse<T> {
  items: T;
  meta: PaginationOptions & {
    totalCount: number;
    lastPage: number;
  };
}
