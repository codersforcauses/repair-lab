import { z } from "zod";

import {
  repairRequestPatchSchema,
  repairRequestPostSchema
} from "@/schema/repair-request";

export type RepairRequest = z.infer<typeof repairRequestPostSchema>;
export type GeneralRepairAttempt = z.infer<typeof repairRequestPatchSchema>;
export type Option = { id: number | string; text: string };

export interface EmailAddress {
  id: string;
  emailAddress: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: EmailAddress[];
  privateMetadata: {
    role?: string;
  };
}

export enum SearchCriteria {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  Role = "role",
  All = "all"
}
