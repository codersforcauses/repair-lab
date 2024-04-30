import { useEffect, useMemo, useState } from "react";
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
    totalCount: images.length,
    perPage: 20,
    page: 1
  });
  const {
    query: { id: eventId }
  } = useRouter();

  const imagesToShow = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;
    return images.slice(startIndex, endIndex);
  }, [images, pagination]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: images.length }));
  }, [images]);

  const { data: event } = useEvent(eventId as string);

  // The 'data' parameter will be used when the backend is set
  const onSubmit: SubmitHandler<ImageFormValues> = (data) => {
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

  // This function may be useful when the backend is set
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

  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full p-4">
        {headerValues ? (
          <>
            <Header {...headerValues} />
            <div className="container">
              <div className="w-auto p-4 text-2xl font-bold text-app-base-200">
                <span>Images ({images.length})</span>
              </div>
              <div className="grid gap-4 p-4 lg:grid-cols-5 ">
                <div
                  className="flex w-full items-center justify-center rounded-lg border bg-app-base-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-app-secondary"
                  role="presentation"
                  onClick={() => setShowModal(true)}
                >
                  <CiCirclePlus className="text-app-base-200" size={100} />
                </div>
                {imagesToShow.map((image, index) => (
                  <div key={index} className="w-40 h-30 flex items-center">
                    <Image
                      src={image}
                      alt="Uploaded image"
                      width={721}
                      height={831}
                      layout="intrinsic"
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
                    <button
                      type="submit"
                      className="bg-app-primary hover:bg-app-primary-focus text-white rounded h-9 w-full"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
            <Pagination
              value={pagination}
              onChange={(nextState) =>
                setPagination((prevState) => ({ ...prevState, ...nextState }))
              }
            />
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
