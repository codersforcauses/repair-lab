import { z } from "zod";

export const repairRequestPostSchema = z.object({
  eventId: z.string().nonempty({ message: "Event is required" }),
  description: z
    .string()
    .nonempty({ message: "A description of the item is required" })
    .min(5, {
      message: "Description of the item must be at least 5 characters long"
    }),
  itemType: z.string().nonempty({ message: "Item type is required" }),
  itemBrand: z.string().nonempty({ message: "Item brand is required" }),
  images: z.string().array().optional()
});

const preprocessBooleanInput = (input: unknown) => {
  const processedInput = z.string().trim().transform(Boolean).safeParse(input);
  return processedInput.success ? processedInput.data : input;
};

export const repairRequestPatchSchema = z.object({
  id: z.string().trim().nonempty({ message: "missing" }),
  item: z.string().nonempty({ message: "Item name is required" }),
  itemBrand: z.string().nonempty({ message: "Brand is required" }),
  itemMaterial: z.string().nonempty({ message: "Material is required" }),
  hoursWorked: z.preprocess(
    (input) => {
      const processedInput = z
        .string()
        .trim()
        .regex(/^[-+]?[0-9]+(\.[0-9]{1,2})?$/)
        .transform(Number)
        .safeParse(input);
      return processedInput.success ? processedInput.data : input;
    },
    z
      .number({
        required_error: "Time in hours is required",
        invalid_type_error: "Time in hours must be a number"
      })
      .positive({ message: "Time in hours must be a positive number" })
  ),
  isRepaired: z.string(),
  isSparePartsNeeded: z.string(),
  spareParts: z.string().optional(),
  repairComment: z
    .string()
    .min(5, { message: "Job description must be at least 5 characters long." })
});
