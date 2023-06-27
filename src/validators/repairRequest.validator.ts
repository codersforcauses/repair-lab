import { z } from "zod";

const postSchema = z.object({
  eventId: z.string().uuid(),
  description: z.string(),
  itemType: z.string(),
  itemBrand: z.string()
});

const validator = {
  postSchema
};

export default validator;
