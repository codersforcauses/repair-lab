import {
  Event as PrismaEvent,
  RepairRequest as PrismaRepairRequest
} from "@prisma/client";
import { z } from "zod";

import { createEventSchema, updateEventSchema } from "@/schema/event";
import {
  createRepairRequestSchema,
  updateRepairRequestSchema
} from "@/schema/repair-request";

import { 
  manageVolunteerSchema
} from "@/schema/manage-volunteer";

// TODO: Not sure if we should be exposing prisma model types in the frontend??

// Repair Requests
export type RepairRequest = PrismaRepairRequest;
export type CreateRepairRequest = z.infer<typeof createRepairRequestSchema>;
export type GeneralRepairAttempt = z.infer<typeof updateRepairRequestSchema>;

// Volunteer Management
export type VolunteerManageAttempt= z.infer<typeof manageVolunteerSchema>;

// Events
export type Event = PrismaEvent;
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
  role: UserRole;
}

export enum SearchCriteria {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  Role = "role",
  All = "all"
}

export enum UserRole {
  ADMIN = "ADMIN",
  ORGANISATION_MANAGER = "ORGANISATION_MANAGER",
  EVENT_MANAGER = "EVENT_MANAGER",
  REPAIRER = "REPAIRER",
  CLIENT = "CLIENT"
}
