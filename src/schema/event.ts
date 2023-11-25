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
    .refine((s) => new Date(s), "Invalid date format for Start Date"),
  endDate: z
    .string()
    .refine((s) => new Date(s), "Invalid date format for Start Date")
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
    .refine((s) => new Date(s), "Invalid date format for Start Date")
    .optional(),
  endDate: z
    .string()
    .refine((s) => new Date(s), "Invalid date format for Start Date")
    .optional(),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).optional()
});
