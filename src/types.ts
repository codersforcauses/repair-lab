import { z } from "zod";

import { repairRequestPostSchema } from "@/schema/repair-request";

export type RepairRequest = z.infer<typeof repairRequestPostSchema>;
