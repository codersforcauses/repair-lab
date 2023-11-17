import { z } from "zod";

import { createEventSchema, updateEventSchema } from "@/schema/event";
import {
  createRepairRequestSchema,
  updateRepairRequestSchema
} from "@/schema/repair-request";

export type RepairRequest = z.infer<typeof createRepairRequestSchema>;
export type GeneralRepairAttempt = z.infer<typeof updateRepairRequestSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;

export type Option = { id: number | string; text: string };

export interface EmailAddress {
  id: string;
  emailAddress: string;
}

export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  role: string | unknown;
}

export enum SearchCriteria {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  Role = "role",
  All = "all"
}

export enum UserRole {
  VOLUNTEER = "volunteer",
  EVENT_MANAGER = "event_manager",
  ADMIN = "admin",
  CLIENT = "client"
}
