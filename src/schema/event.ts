import { EventStatus } from "@prisma/client";
import { z } from "zod";

import prisma from "@/lib/prisma";

const eventStatusSchema = z.union([
  z.literal("").transform(() => undefined),
  z.nativeEnum(EventStatus).transform((s) => [s]),
  z.array(z.nativeEnum(EventStatus))
]);

const stringOrArray = z.union([
  z.literal("").transform(() => undefined),
  z.string().transform((s) => [s]),
  z.array(z.string())
]);

export const getEventSchema = z.object({
  sortKey: z.string().refine((value) => value in prisma.event.fields, {
    message: "Incorrect value for sortKey"
  }),
  sortMethod: z.enum(["asc", "desc"]),
  searchWord: z.string().optional(),
  minStartDate: z.string().datetime().optional(),
  maxStartDate: z.string().datetime().optional(),
  eventType: stringOrArray,
  eventStatus: eventStatusSchema,
  createdBy: stringOrArray.optional()
});

export const createEventSchema = z
  .object({
    name: z.string().min(1, { message: "Event name is required" }),
    location: z.string().min(1, { message: "Event location is required" }),
    description: z.string().min(5, {
      message: "Description of the event must be more than 5 characters long."
    }),
    disclaimer: z.string().optional(),
    eventType: z.string().min(1, { message: "Event type is required" }),
    startDate: z
      .string()
      .datetime({ offset: true, message: "Invalid date format for startDate" }),
    endDate: z
      .string()
      .datetime({ offset: true, message: "Invalid date format for endDate" })
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    // validation to ensure the end date comes after the start date
    message: "End Date must be later than Start Date",
    path: ["endDate"]
  });

export const updateEventSchema = z
  .object({
    name: z.string().optional(),
    location: z.string().optional(),
    description: z
      .string()
      .min(5, {
        message: "Description of the event must be more than 5 characters long."
      })
      .optional(),
    disclaimer: z.string().optional(),
    eventType: z.string().optional(),
    startDate: z
      .string()
      .datetime({ offset: true, message: "Invalid date format for startDate" })
      .optional(),
    endDate: z
      .string()
      .datetime({ offset: true, message: "Invalid date format for endDate" })
      .optional(),
    status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).optional()
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        // validation to ensure the end date comes after the start date
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End Date must be later than Start Date",
      path: ["endDate"]
    }
  );
