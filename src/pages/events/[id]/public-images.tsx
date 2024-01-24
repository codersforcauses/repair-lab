import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form"; // For using FieldImageUpload
import { CiCirclePlus } from "react-icons/ci";

import FieldImageUpload from "@/components/FormFields/field-image-upload";
import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { Pagination } from "@/components/pagination";
import Sidebar from "@/components/sidebar/index";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvent } from "@/hooks/events";

// TODO: clean this up this is a place holder for now

// Dummy images to be removed after setting up the backend
const dummyImages = [
  "/images/repair_lab_logo.png",
  "/images/Repair_Lab_bikerepair.jpg",
  "/images/generalToy.jpeg"
];

interface ImageFormValues {
  images: FileList;
}

export default function Images() {
  const [images, setImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [headerValues, setHeaderValues] = useState<HeaderProps>();
  const { control, handleSubmit, reset } = useForm<ImageFormValues>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20,
    total: images.length
  });
  const {
    query: { id: eventId }
  } = useRouter();

  const { data: event } = useEvent(eventId as string);

  const onSubmit: SubmitHandler<ImageFormValues> = (data) => {
    // The 'data' parameter will be used when the backend is set
    setShowModal(false);
    const newImage = dummyImages[currentImageIndex]; // Use dummy images for now
    setImages((prevImages) => [...prevImages, newImage]);
    setCurrentImageIndex(
      (currentIndex) => (currentIndex + 1) % dummyImages.length
    );
    reset();
  };

  useEffect(() => {
    if (!event) return;
    setHeaderValues({
      name: event.name,
      location: event.location,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      createdBy: event.createdBy
    });
    // setImages(event.images); // TODO: enable this when api returns it
  }, [event]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: images.length }));
  }, [images]);

  function renderImages() {
    const content = [];
    // TODO: extract image from s3*/}

    for (let i = 0; i < images.length; i++) {
      content.push(
        <div key={i}>
          <Image src={images[i]} alt="event image" width={300} height={300} />
        </div>
      );
    }
    return content;
  }

  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const imagesToShow = images.slice(startIndex, endIndex);

  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full p-4">
        {headerValues ? (
          <>
            <Header {...headerValues} />
            <div className="container">
              <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
                <span>Images ({renderImages().length})</span>
              </div>
              <div className="container mx-auto">
                <div className="flex justify-end"></div>
              </div>
              <div className="grid gap-4 p-4 lg:grid-cols-5 ">
                <div
                  className="flex w-full items-center justify-center rounded-lg border bg-grey-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-secondary-50"
                  role="presentation"
                  onClick={() => setShowModal(true)}
                >
                  <CiCirclePlus color="rgb(82 82 91)" size={100} />
                </div>
                {imagesToShow.map((image, index) => (
                  <div key={index} className="w-40 h-30">
                    <Image
                      src={image}
                      alt="Uploaded image"
                      width={721}
                      height={831}
                    />
                  </div>
                ))}
              </div>
              <Modal
                showModal={showModal}
                setShowPopup={setShowModal}
                title="Upload Images"
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="text-left p-4"
                >
                  <FieldImageUpload multiple name="images" control={control} />
                  <div className="flex justify-center p-4">
                    <div className="w-1/3">
                      <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-700 text-white rounded h-9 w-full"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </Modal>
            </div>
            <Pagination value={pagination} onChange={setPagination} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center ">
            <LoadingSpinner />
          </div>
        )}
      </main>
    </Sidebar>
  );
}
