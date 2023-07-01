import { z } from "zod";

export const repairRequestPostSchema = z.object({
  eventId: z.string().uuid(),
  description: z.string().nonempty().min(5), // ? Have a min number of words for description?
  itemType: z.string().nonempty(),
  itemBrand: z.string().nonempty()
});
