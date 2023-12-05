import { z } from "zod"

const volunteerObject = z.object({
  id: z.number(),
  text: z.string()
});

export const manageVolunteerSchema = z.object({
volunteers: z.array(volunteerObject)
});



