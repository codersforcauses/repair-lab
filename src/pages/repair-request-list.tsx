import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import Modal from "@/components/Modal";

type RepairRequestImage = {
  id: string;
  s3Key: string;
};

type RepairAttemptList = {
  id: string;
  itemBrand: string;
  itemType: string;
  description: string;
  images: RepairRequestImage[];
};

export default function RepairReqList() {
  const [repairReqList, setRepairReqList] = useState([] as RepairAttemptList[]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedRepairReqImages, setSelectedRepairReqImages] = useState<
    RepairRequestImage[]
  >([]);

  async function fetchData() {
    const response = await fetch(`/api/repair-request`, {
      method: "GET"
    });
    const data = await response.json();
    setRepairReqList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenImageModal = (imageList: RepairRequestImage[]) => {
    setSelectedRepairReqImages(imageList);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setSelectedRepairReqImages([]);
    setShowImageModal(false);
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      {/* Logo of Repair Lab, which links to the main website. */}
      <picture>
        <a href="https://repairlab.myfreesites.net/" target="_blank">
          <Image
            src="/images/repair_lab_logo.jpg"
            alt="Repair Labs Logo"
            width={80}
            height={80}
          />
        </a>
      </picture>

      {/* Heading of the Page */}
      <h1 className="text-xl font-bold"> Repair Request List</h1>

      {/* get the request list from the database and display it here*/}

      {repairReqList.map((repairReq) => (
        <div className="border bg-gray-200 max-w-lg max-h-lg p-5 rounded-md" key={repairReq.id}>
          <div className="flex flex-col items-center">
              <div>
                <h1 className="p-1">ID: {repairReq.id}</h1>
                <h1 className="p-1">ItemBrand: {repairReq.itemBrand}</h1>
                <p className="p-1">ItemType: {repairReq.itemType}</p>
                <p className="p-1">Description: <div className="border bg-white w-full max-h-lg p-4">{repairReq.description}</div></p>
              </div>
              <div className="flex flex-row space-x-4 p-1">
                {/* Button to display images */}
                <Button onClick={() => handleOpenImageModal(repairReq.images)} width="w-40">
                  View Images
                </Button>

                {/* Button to update request */}
                <Link href="/repair-attempt/">
              <Button width="w-40">Update Details</Button>
                </Link>
              </div>
          </div>
        </div>
      ))}

      {/* Modal to display images */}
      <Modal
        showModal={showImageModal}
        setShowPopup={handleCloseImageModal}
        title="Repair Request Images"
      >
        {/* Not yet displaying the images properly */}
        <div className="flex flex-col items-center gap-4">
          {selectedRepairReqImages && selectedRepairReqImages.length > 0 ? (
            selectedRepairReqImages.map((images) => (
              <div key={images.id}>
                <Image
                  src={images.s3Key}
                  alt="Repair Request Image"
                  width={300}
                  height={300}
                />
              </div>
            ))
          ) : (
            <p>No images to display.</p>
          )}
        </div>

        <Button onClick={handleCloseImageModal}>Close</Button>
      </Modal>
    </main>
  );
}
