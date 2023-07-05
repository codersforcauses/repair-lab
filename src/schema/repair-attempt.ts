import { z } from "zod";

const preprocessBooleanInput = (input: unknown) => {
  const processedInput = z.string().trim().transform(Boolean).safeParse(input);
  return processedInput.success ? processedInput.data : input;
};

export const RepairAttemptSchema = z.object({
  id: z.string().trim().nonempty({ message: "missing" }),
  item: z.string().nonempty({ message: "Item name is required" }),
  itemBrand: z.string().nonempty({ message: "Brand is required" }),
  itemMaterial: z.string().nonempty({ message: "Material is required" }),
  time: z.preprocess(
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
  isRepaired: z.preprocess(preprocessBooleanInput, z.boolean()),
  isSparePartsNeeded: z.preprocess(preprocessBooleanInput, z.boolean()),
  spareParts: z.string().optional(),
  comment: z
    .string()
    .min(5, { message: "Job description must be at least 5 characters long." })
});

export type RepairAttempt = z.infer<typeof RepairAttemptSchema>;
