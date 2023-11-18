import { useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler } from "react-hook-form";

import PrepopulatedEventForm from "@/components/Forms/prepopulated-event-form";
import Modal from "@/components/Modal";
import { useUpdateEvent } from "@/hooks/events";
import { Event, UpdateEvent } from "@/types";

export default function EventFormEditButton({ props }: { props: Event }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const { mutate: updateEvent } = useUpdateEvent(props.id);

  const onSubmit: SubmitHandler<UpdateEvent> = async (data) => {
    updateEvent(data, {
      onSuccess: () => {
        setShowEditModal(false);
      }
    });
  };

  return (
    <>
      <button onClick={() => setShowEditModal(true)}>
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <Modal
        setShowPopup={setShowEditModal}
        showModal={showEditModal}
        height="h-3/4"
      >
        <PrepopulatedEventForm props={props} onSubmit={onSubmit} />
      </Modal>
    </>
  );
}
