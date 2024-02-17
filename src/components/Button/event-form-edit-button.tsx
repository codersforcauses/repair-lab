import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { FaPencilAlt } from "react-icons/fa";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import PrepopulatedEventForm from "@/components/Forms/prepopulated-event-form";
import Modal from "@/components/Modal";
import { useUpdateEvent } from "@/hooks/events";
import generateThumbnail from "@/lib/gen-thumbnail";
import uploadImage from "@/lib/upload-image";
import { EventResponse, UpdateEvent } from "@/types";

export default function EventFormEditButton({
  props
}: {
  props: EventResponse;
}) {
  const [showEditModal, setShowEditModal] = useState(false);

  const { mutate: updateEvent } = useUpdateEvent(props.id);

  const onSubmit: SubmitHandler<UpdateEvent> = async (data) => {
    const uploadPromises =
      data.images?.map(async (image) => await uploadImage(image)) ?? [];
    const uploadThumbailPromise = data.images?.[0]
      ? generateThumbnail(data.images[0]).then(uploadImage)
      : undefined;
    const keys = await Promise.all([uploadThumbailPromise, ...uploadPromises]);
    const [thumbnailImage, ...images] = keys;
    const updatedData = { ...data, thumbnailImage, images };

    updateEvent(updatedData, {
      onSuccess: () => {
        setShowEditModal(false);
      }
    });
  };

  return (
    <>
      <HoverOpacityButton onClick={() => setShowEditModal(true)}>
        <FaPencilAlt />
      </HoverOpacityButton>
      <Modal
        setShowPopup={setShowEditModal}
        showModal={showEditModal}
        title="Edit an Event"
      >
        <PrepopulatedEventForm props={props} onSubmit={onSubmit} />
      </Modal>
    </>
  );
}
