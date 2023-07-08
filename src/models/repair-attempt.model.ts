import prisma from "@/lib/prisma";
import { ItemStatus } from "@prisma/client";

const update = async (
  id: string,
  itemMaterial: string,
  hoursWorked: number,
  itemStatus: ItemStatus,
  spareParts: string | undefined,
  comment: string
) => {
  const repairAttempt = await prisma.repairRequest.update({
    where: { id: id },
    data: {
      itemMaterial,
      hoursWorked,
      itemStatus,
      spareParts,
      comment
    }
  });
  return repairAttempt;
};

const RepairAttemptModel = {
  update
};

export default RepairAttemptModel;
