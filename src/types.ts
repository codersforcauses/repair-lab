import { z } from "zod";

import { repairRequestPostSchema } from "@/schema/repair-request";
import { RepairAttemptSchema } from "@/schema/repair-attempt";

export type RepairRequest = z.infer<typeof repairRequestPostSchema>;
export type RepairAttempt = z.infer<typeof RepairAttemptSchema>;
