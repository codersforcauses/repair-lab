import { z } from "zod";

export const itemTypeSchema = z.object({
  name: z.string().nonempty()
});
