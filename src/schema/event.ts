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
    .datetime({ offset: true, message: "Invalid date format for startDate" }),
  endDate: z
    .string()
    .datetime({ offset: true, message: "Invalid date format for endDate" }),
  volunteers: z.string().array().nonempty({ message: "Need at least one volunteer!",})
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
    .datetime({ offset: true, message: "Invalid date format for startDate" })
    .optional(),
  endDate: z
    .string()
    .datetime({ offset: true, message: "Invalid date format for endDate" })
    .optional(),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).optional(),
  volunteers: z.string().array().optional()
});
