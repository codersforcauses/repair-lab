import prisma from "@/lib/prisma";
import { ItemStatus } from "@prisma/client";

const update = async (
  id: string,
  itemMaterial: string,
  // time: number, FIXME: Missing from db schema
  itemStatus: ItemStatus,
  spareParts: string | undefined,
  comment: string
) => {
  const repairAttempt = await prisma.repairRequest.update({
    where: { id: id },
    data: {
      itemMaterial,
      // time,
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
