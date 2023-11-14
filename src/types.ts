import { z } from "zod";

import {
  createRepairRequestSchema,
  updateRepairRequestSchema
} from "@/schema/repair-request";

export type RepairRequest = z.infer<typeof createRepairRequestSchema>;
export type GeneralRepairAttempt = z.infer<typeof updateRepairRequestSchema>;
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
