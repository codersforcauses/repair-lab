import { z } from "zod";

import {
  repairRequestPostSchema,
  repairRequestPatchSchema
} from "@/schema/repair-request";

export type RepairRequest = z.infer<typeof repairRequestPostSchema>;
export type RepairAttempt = z.infer<typeof repairRequestPatchSchema>;
