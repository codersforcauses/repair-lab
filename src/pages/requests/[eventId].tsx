import { useEffect, useState } from "react";
import Image from "next/image";
import { FaImages, FaEdit } from "react-icons/fa";
import { Inter } from "next/font/google";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { RepairRequest, RepairRequestImage } from "@prisma/client";
import FormatDate from "@/components/utils/format-date";
import StatusPill from "@/components/Cards/status-pill";
import PrepopulatedRepairAttemptForm from "@/components/Forms/prepopulated-repair-request-form";

const inter = Inter({ subsets: ["latin"] });
const minWidth = 425;

type Request = RepairRequest & {
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
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({} as RepairRequest);

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

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
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
      className={`rounded-lgpy-2 flex flex-col items-center gap-4 max-[768px]:m-7 md:mx-auto md:my-7 md:w-[768px] ${inter.className}`}
    >
      <a href="https://repairlab.myfreesites.net/" target="_blank">
        <Image
          src="/images/repair_lab_logo.jpg"
          alt="Repair Labs Logo"
          width={80}
          height={80}
        />
      </a>

      {/* Heading of the Page */}
      <h1 className="text-3xl font-bold"> Repair Request List</h1>
      <p className="my-2 text-center text-sm">
        Event:
        <span className="text-primary-600">
          {" " + eventInfo.name} @ {eventInfo.location}
        </span>
        <br />
        Event Start Date:{" "}
        <span className="text-primary-600">
          {FormatDate(eventInfo.startDate)}
        </span>
        <br />
        Total number of repair requests:{" "}
        <span className="font-bold text-primary-600">{requests.length}</span>
      </p>

      {requests.map((repairReq) => (
        <div
          className="mb-2 h-full w-11/12 rounded-md border-2 border-lightAqua-200 bg-lightAqua-100 p-4 shadow-md"
          key={repairReq.id}
        >
          <div className="relative flex flex-col items-start">
            {/* slice ID for simplification */}
            <p className="pb-1">ID: {repairReq.id.slice(0, 2)}</p>
            <p className="pb-1">Brand: {repairReq.itemBrand}</p>
            <p className="pb-1">Item: {repairReq.itemType}</p>
            <p className="pb-1">Submitted By: {repairReq.createdBy}</p>
            <p className="pb-1">Description: </p>
            <div className=" w-full bg-white p-3">{repairReq.description}</div>

            <div className="absolute right-0">
              <StatusPill status={repairReq.status}></StatusPill>
            </div>

            <div className="mt-4 flex w-full justify-center gap-8">
              {/* Button to display images */}
              <div>
                <Button
                  position="shadow-md"
                  width={windowWidth <= minWidth ? "w-12 px-2" : "px-2"}
                  height={windowWidth <= minWidth ? "h-11" : "h-12"}
                  textSize={windowWidth <= minWidth ? "text-3xl" : "text-base"}
                  onClick={() => handleOpenImageModal(repairReq.images)}
                >
                  {displayText.displayImage}
                </Button>
              </div>

              {/* Button to update request */}
              <Button
                position="shadow-md"
                width={windowWidth <= minWidth ? "w-12 px-3 pb-1" : "px-2"}
                height={windowWidth <= minWidth ? "h-11" : "h-12"}
                textSize={windowWidth <= minWidth ? "text-3xl" : "text-base"}
                onClick={() => {
                  setShowRequestModal(true);
                  setSelectedRequest(repairReq);
                }}
              >
                {displayText.updateDetails}
              </Button>
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
        <div className="mt-3 flex flex-col items-center gap-4">
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

      {/* Modal to display pre-populated repair request */}
      <Modal
        setShowPopup={setShowRequestModal}
        showModal={showRequestModal}
        height="h-full"
      >
        <div className="text-center">
          <h1 className="text-xl font-bold">Repair ID:</h1>
          <h2 className="text-l font-bold">
            {selectedRequest.id} <StatusPill status={selectedRequest.status} />
          </h2>
          <div>
            <PrepopulatedRepairAttemptForm
              props={selectedRequest}
            ></PrepopulatedRepairAttemptForm>
          </div>
        </div>
      </Modal>
    </main>
  );
}
