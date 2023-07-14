import { z } from "zod";

export const eventFormPostSchema = z.object({
  name: z.string().nonempty(),
  location: z.string().nonempty(),
  startDate: z.date({
    // or z.string().nonempty(), ?
    required_error: "Please select a date and time.",
    invalid_type_error: "Please input a valid date and time."
  }),
  endDate: z.date({
    // or z.string().nonempty(), ?
    required_error: "Please select a date and time.",
    invalid_type_error: "Please input a valid date and time."
  }),
  eventType: z.string().nonempty(),
  volunteers: z.string().nonempty()
});
