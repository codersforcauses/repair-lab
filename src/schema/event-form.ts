import { z } from "zod";

export const eventFormPostSchema = z.object({
  name: z.string().nonempty(),
  location: z.string().nonempty(),
  startDate: z.date().refine((value) => value instanceof Date, {
    message: "Please select a valid date and time.",
  }),
  endDate: z.date().refine((value) => value instanceof Date, {
    message: "Please select a valid date and time.",
  }),
  eventType: z.string().nonempty(),
  volunteers: z.string().nonempty(),
});