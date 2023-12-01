import { z } from "zod";

const dateStringToISO = (
  val: string,
  ctx: z.RefinementCtx,
  message: string
) => {
  const parsed = new Date(val);
  if (isNaN(parsed.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message
    });
    return z.NEVER;
  }
  return parsed.toISOString();
};

export const createEventSchema = z
  .object({
    name: z.string().min(1, { message: "Event name is required" }),
    location: z.string().min(1, { message: "Event location is required" }),
    description: z.string().min(5, {
      message: "Description of the event must be more than 5 characters long."
    }),
    disclaimer: z.string().optional(),
    eventType: z.string().min(1, { message: "Event type is required" }),
    startDate: z
      .string()
      .min(1, { message: "Start Date is required" })
      .transform((str, ctx) =>
        dateStringToISO(str, ctx, "Invalid date format for Start Date")
      ),
    endDate: z
      .string()
      .min(1, { message: "End Date is required" })
      .transform((str, ctx) =>
        dateStringToISO(str, ctx, "Invalid date format for End Date")
      )
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    // validation to ensure the end date comes after the start date
    message: "End Date must be later than Start Date",
    path: ["endDate"]
  });

export const updateEventSchema = z
  .object({
    name: z.string().optional(),
    location: z.string().optional(),
    description: z
      .string()
      .min(5, {
        message: "Description of the event must be more than 5 characters long."
      })
      .optional(),
    disclaimer: z.string().optional(),
    eventType: z.string().optional(),
    startDate: z
      .string()
      .transform((str, ctx) =>
        dateStringToISO(str, ctx, "Invalid date format for Start Date")
      )
      .optional(),
    endDate: z
      .string()
      .transform((str, ctx) =>
        dateStringToISO(str, ctx, "Invalid date format for End Date")
      )
      .optional(),
    status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).optional()
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        // validation to ensure the end date comes after the start date
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End Date must be later than Start Date",
      path: ["endDate"]
    }
  );
