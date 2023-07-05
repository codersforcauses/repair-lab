import { z } from "zod";

import { repairRequestPostSchema } from "@/schema/repair-request";

type RepairRequest = z.infer<typeof repairRequestPostSchema>;
