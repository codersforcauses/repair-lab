import prisma from "@/lib/prisma";

export async function seedTestData() {
  // Create item types
  await prisma.itemType.createMany({
    data: ["Laptop", "Clock", "Sponge"].map((name) => ({ name }))
  });

  // Create events - only id is important
  const baseEventDetails = {
    location: "Curtin University",
    createdBy: "user_1",
    eventType: "Laptop",
    description: "Laptop repair event.",
    startDate: new Date("2023-11-16"),
    endDate: new Date("2023-11-17")
  };
  const eventIds = ["ev-1", "ev-2"];
  await prisma.event.createMany({
    data: eventIds.map((id) => ({ ...baseEventDetails, id, name: id }))
  });

  // Create repair requests
  const baseRepairRequestDetails = {
    comment: "Some comment",
    thumbnailImage: ""
  };
  await prisma.repairRequest.createMany({
    data: [
      {
        ...baseRepairRequestDetails,
        id: "rr-1",
        eventId: "ev-1",
        createdBy: "user_1",
        description: "My laptop is broken",
        itemType: "Laptop",
        itemBrand: "Apple",
        assignedTo: "user_2"
      },
      {
        ...baseRepairRequestDetails,
        id: "rr-2",
        eventId: "ev-1",
        createdBy: "user_1",
        description: "Very specific word: eggplant",
        itemType: "Clock",
        itemBrand: "Clock Co"
      },
      {
        ...baseRepairRequestDetails,
        id: "rr-3",
        eventId: "ev-2",
        createdBy: "user_2",
        description: "My laptop is broken",
        itemType: "Laptop",
        itemBrand: "Dell"
      },
      {
        ...baseRepairRequestDetails,
        id: "rr-4",
        eventId: "ev-2",
        createdBy: "user_1",
        description: "Yep",
        itemType: "Laptop",
        itemBrand: "Dell"
      }
    ]
  });
}
