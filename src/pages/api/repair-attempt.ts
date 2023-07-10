import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import { RepairAttemptSchema } from "@/schema/repair-attempt";
import RepairAttemptService from "@/services/repair-attempt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PATCH":
      await updateRepairRequest(req, res);
      break;
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

//
const updateRepairRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const parseResult = RepairAttemptSchema.safeParse(req.body);
  if (!parseResult.success) return res.status(400).json(parseResult.error);

  try {
    const {
      id,
      itemMaterial,
      hoursWorked,
      isRepaired,
      spareParts,
      repairComment
    } = parseResult.data;
    const repairAttempt = await RepairAttemptService.update(
      id,
      itemMaterial,
      hoursWorked,
      isRepaired ? "REPAIRED" : "FAILED",
      spareParts,
      repairComment
    );
    return res.status(200).json(repairAttempt);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.statusMessage = "Repair attempt not found";
        return res.status(404).end();
      }
      return res.status(400).json({ message: "Client Error" });
    }
    return res.status(500).json({ message: { error } });
  }
};
