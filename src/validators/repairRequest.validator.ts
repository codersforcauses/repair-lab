import { z } from "zod";

const postSchema = z.object({
  eventId: z.string().uuid(),
  description: z.string().nonempty(),
  itemType: z.string().nonempty(),
  itemBrand: z.string().nonempty()
});

const validator = {
  postSchema
};

export default validator;
