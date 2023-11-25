import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  location: z.string().min(1, { message: "Event location is required" }),
  description: z.string().min(5, {
    message: "Description of the event must be more than 5 characters long."
  }),
  disclaimer: z.string().optional(),
  eventType: z.string().min(1, { message: "Event type is required" }),
  startDate: z
    .string()
    .refine(
      (s) => new Date(s).toString() !== "Invalid Date",
      "Invalid date format for start date"
    ),
  endDate: z
    .string()
    .refine(
      (s) => new Date(s).toString() !== "Invalid Date",
      "Invalid date format for end date"
    )
});

export const updateEventSchema = z.object({
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
    .refine(
      (s) => new Date(s).toString() !== "Invalid Date",
      "Invalid date format for start date"
    )
    .optional(),
  endDate: z
    .string()
    .refine(
      (s) => new Date(s).toString() !== "Invalid Date",
      "Invalid date format for end date"
    )
    .optional(),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).optional()
});
