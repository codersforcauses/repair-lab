import prisma from "@/lib/prisma";

const insert = async (
  eventId: string,
  description: string,
  itemType: string,
  itemBrand: string,
  createdBy: string,
  images: string[] | undefined,
  comment: string,
  thumbnailImage: string
) => {
  const repairRequest = await prisma.repairRequest.create({
    data: {
      createdBy,
      eventId,
      description,
      itemType,
      itemBrand,
      comment,
      thumbnailImage,
      images: {
        create: images?.map((image) => {
          return {
            s3Key: image
          };
        })
      }
    }
  });
  return repairRequest;
};

const repairRequestModel = {
  insert
};

export default repairRequestModel;
