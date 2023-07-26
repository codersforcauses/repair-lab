import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { RepairRequestImage } from "@prisma/client";

type Request = {
  id: string;
  itemBrand: string;
  itemType: string;
  description: string;
  images: RepairRequestImage[];
};

export default function RepairReqList() {
  const [requests, setRequests] = useState([] as Request[]);
  const [images, setImages] = useState([] as RepairRequestImage[]);
  const [showImageModal, setShowImageModal] = useState(false);

  const {
    query: { eventId }
  } = useRouter();

  async function fetchData(params: URLSearchParams) {
    const response = await fetch(`/api/repair-request?${params}`, {
      method: "GET"
    });
    const data = await response.json();
    setRequests(data);
  }

  useEffect(() => {
    if (!eventId) return;
    const params = new URLSearchParams();
    params.append("eventId", eventId as string);
    fetchData(params);
  }, [eventId]);

  const handleOpenImageModal = (images: RepairRequestImage[]) => {
    setImages(images);
    setShowImageModal(true);
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
      <h1> Count: {requests.length}</h1>

      {/* get the request list from the database and display it here*/}

      {requests.map((repairReq) => (
        <div
          className="max-h-lg max-w-lg rounded-md border bg-gray-200 p-5"
          key={repairReq.id}
        >
          <div className="flex flex-col items-center">
            <div>
              <h1 className="p-1">ID: {repairReq.id}</h1>
              <h1 className="p-1">ItemBrand: {repairReq.itemBrand}</h1>
              <p className="p-1">ItemType: {repairReq.itemType}</p>
              <p className="p-1">Description: </p>
              <div className="max-h-lg mb-2 w-full border bg-white p-4">
                {repairReq.description}
              </div>
            </div>
            <div className="flex flex-row space-x-4 p-1">
              {/* Button to display images */}
              <Button
                onClick={() => handleOpenImageModal(repairReq.images)}
                width="w-40"
              >
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
        title="Repair Request Images"
        setShowPopup={setShowImageModal}
      >
        <div className="flex flex-col items-center gap-4">
          {!images && <h1>No images found</h1>}
          {images &&
            images.map((image) => (
              <div key={image.id}>
                <Image
                  // src={image.s3Key}  TODO: uncomment this line when we have the images in S3
                  src="/images/event_details.jpg"
                  alt="Repair Request Image"
                  width={300}
                  height={300}
                />
              </div>
            ))}
        </div>
      </Modal>
    </main>
  );
}
