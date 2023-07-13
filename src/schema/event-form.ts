import { z } from "zod";

export const eventFormPostSchema = z.object({
  eventName: z.string().nonempty(),
  location: z.string().nonempty(),
  dateTime: z.date({
    // or z.string().nonempty(), ?
    required_error: "Please select a date and time.",
    invalid_type_error: "Please input a valid date and time."
  }),
  eventStatus: z.string().nonempty(),
  assignedVolunteers: z.string().nonempty()
});
