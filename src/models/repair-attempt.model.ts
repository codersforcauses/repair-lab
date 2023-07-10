import prisma from "@/lib/prisma";
import { ItemStatus } from "@prisma/client";

const update = async (
  id: string,
  itemMaterial: string,
  hoursWorked: number,
  itemStatus: ItemStatus,
  spareParts: string | undefined,
  repairComment: string
) => {
  const repairAttempt = await prisma.repairRequest.update({
    where: { id: id },
    data: {
      itemMaterial,
      hoursWorked,
      itemStatus,
      spareParts,
      repairComment
    }
  });
  return repairAttempt;
};

const RepairAttemptModel = {
  update
};

export default RepairAttemptModel;
