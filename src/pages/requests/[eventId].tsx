import { useEffect, useState } from "react";
import Image from "next/image";
import { FaImages, FaEdit } from "react-icons/fa";
import Link from "next/link";
import { Inter } from "next/font/google";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { RepairRequestImage } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });
const minWidth = 425;

type Request = {
  id: string;
  itemBrand: string;
  itemType: string;
  description: string;
  images: RepairRequestImage[];
};

type Event = {
  id: string;
  name: string;
  location: string;
  startDate: string;
};

type Text = {
  displayImage: string | JSX.Element;
  updateDetails: string | JSX.Element;
};

export default function RepairReqList() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [displayText, setDisplayText] = useState({} as Text);
  const [requests, setRequests] = useState([] as Request[]);
  const [eventInfo, setEventInfo] = useState({} as Event);
  const [images, setImages] = useState([] as RepairRequestImage[]);
  const [showImageModal, setShowImageModal] = useState(false);

  const {
    query: { eventId: event }
  } = useRouter();

  async function fetchData(params: URLSearchParams) {
    // fetch repair requests
    const reqResponse = await fetch(`/api/repair-request?${params}`, {
      method: "GET"
    });
    const requests = await reqResponse.json();
    setRequests(requests);

    // fetch event details
    const eventResponse = await fetch(`/api/events/get-event?${params}`, {
      method: "GET"
    });
    const event = await eventResponse.json();
    setEventInfo(event);
  }

  useEffect(() => {
    if (!event) return;
    const params = new URLSearchParams();
    params.append("event", event as string);
    fetchData(params);
  }, [event]);

  const handleOpenImageModal = (images: RepairRequestImage[]) => {
    setImages(images);
    setShowImageModal(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial window width
    setWindowWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < minWidth) {
      setDisplayText({
        displayImage: <FaImages />,
        updateDetails: <FaEdit />
      });
    } else {
      setDisplayText({
        displayImage: "View Images",
        updateDetails: "Update Details"
      });
    }
  }, [windowWidth]);

  return (
    <main
      className={`${inter.className} my-3 flex min-h-screen flex-col items-center gap-2`}
    >
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
      <h1 className="text-3xl font-bold"> Repair Request List</h1>
      {/* TODO: need a better way to deal with datetime display */}
      <p className="my-2 text-center text-sm">
        Event:
        <span className="text-primary-600">
          {" " + eventInfo.name} @ {eventInfo.location}
        </span>
        <br />
        Event Start Date:
        <span className="text-primary-600">{" " + eventInfo.startDate}</span>
        <br />
        Total number of repair requests:{" "}
        <b className="text-primary-600">{requests.length}</b>
      </p>

      {/* get the request list from the database and display it here*/}

      {requests.map((repairReq) => (
        <div
          className="mb-2 h-full w-11/12 rounded-md bg-lightAqua-100 p-4"
          key={repairReq.id}
        >
          <div className="flex flex-col items-start">
            <p className="p-1">ID: {repairReq.id}</p>
            <p className="p-1">ItemBrand: {repairReq.itemBrand}</p>
            <p className="p-1">ItemType: {repairReq.itemType}</p>
            <p className="p-1">Description: </p>
            <div className=" w-full bg-white p-3">{repairReq.description}</div>
            <div className="mt-4 flex w-full justify-center gap-8">
              {/* Button to display images */}
              <div>
                <Button
                  width={windowWidth <= minWidth ? "w-11 px-3" : "px-2"}
                  height={windowWidth <= minWidth ? "h-11" : "h-12"}
                  textSize={windowWidth <= minWidth ? "text-lg" : "text-base"}
                  onClick={() => handleOpenImageModal(repairReq.images)}
                >
                  {displayText.displayImage}
                </Button>
              </div>

              {/* Button to update request */}
              <Link href="/repair-attempt/">
                <Button
                  width={windowWidth <= minWidth ? "w-11 px-3" : "px-2"}
                  height={windowWidth <= minWidth ? "h-11" : "h-12"}
                  textSize={windowWidth <= minWidth ? "text-lg" : "text-base"}
                >
                  {displayText.updateDetails}
                </Button>
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
          {!images && <h2>No images found</h2>}
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
