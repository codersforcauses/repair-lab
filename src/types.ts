import { z } from "zod";

import {
  repairRequestPostSchema,
  repairRequestPatchSchema
} from "@/schema/repair-request";

export type RepairRequest = z.infer<typeof repairRequestPostSchema>;
export type GeneralRepairAttempt = z.infer<typeof repairRequestPatchSchema>;
