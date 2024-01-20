import { z } from "zod";

export const createEventSchema = z
  .object({
    name: z.string({ required_error: "Event name is required" }),
    location: z.string({ required_error: "Event location is required" }),
    description: z
      .string({ required_error: "Description of the event is required" })
      .min(5, {
        message: "Description of the event must be more than 5 characters long."
      }),
    disclaimer: z.string().optional(),
    eventType: z.string({ required_error: "Event type is required" }),
    startDate: z
      .string({ required_error: "startDate is required" })
      .datetime({ offset: true, message: "Invalid date format for startDate" }),
    endDate: z
      .string({ required_error: "endDate is required" })
      .datetime({ offset: true, message: "Invalid date format for endDate" })
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    // validation to ensure the end date comes after the start date
    message: "End Date must be later than Start Date",
    path: ["endDate"]
  });

export const addEventRepairerSchema = z.object({
  userId: z.array(z.string({ required_error: "UserId is required" })),
  id: z.string({ required_error: "Event ID is required" })
});

export const updateEventSchema = z
  .object({
    name: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
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
