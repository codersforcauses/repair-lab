import type { NextApiRequest, NextApiResponse } from "next";

import { RepairAttemptSchema } from "@/schema/repair-attempt";
import RepairAttemptModel from "@/models/repair-attempt.model";

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
  const response = RepairAttemptSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(400).json(response.error);
  }

  try {
    const { id, itemMaterial, hoursWorked, isRepaired, spareParts, comment } =
      response.data;
    const repairAttempt = await RepairAttemptModel.update(
      id,
      itemMaterial,
      hoursWorked,
      isRepaired ? "REPAIRED" : "FAILED",
      spareParts,
      comment
    );

    return res.status(200).json(repairAttempt);
  } catch (error) {
    return res.status(500).json({ message: "Failed inserting to database" });
  }
};
