import { z } from "zod";

export const createRepairRequestSchema = z.object({
  eventId: z.string().min(1, { message: "Event is required" }),
  description: z.string().min(5, {
    message: "Description of the item must be at least 5 characters long"
  }),
  itemType: z.string().min(1, { message: "Item type is required" }),
  itemBrand: z.string().min(1, { message: "Item brand is required" }),
  images: z.string().array().optional(),
  comment: z.string().optional()
});

const preprocessBooleanInput = (input: unknown) => {
  const processedInput = z.string().trim().transform(Boolean).safeParse(input);
  return processedInput.success ? processedInput.data : input;
};

export const updateRepairRequestSchema = z.object({
  id: z.string().trim().min(1, { message: "missing" }),
  item: z.string().min(1, { message: "Item name is required" }),
  itemBrand: z.string().min(1, { message: "Brand is required" }),
  itemMaterial: z.string().min(1, { message: "Material is required" }),
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
