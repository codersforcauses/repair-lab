import { useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "@prisma/client";

import PrepopulatedEventForm from "@/components/Forms/prepopulated-event-form";
import Modal from "@/components/Modal";
import { useUpdateEvent } from "@/hooks/events";

export default function EventFormEditButton({ props }: { props: Event }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const { mutate: updateEvent } = useUpdateEvent(props.id);

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
        <PrepopulatedEventForm
          props={props}
          onSubmit={(data) => {
            updateEvent(data);
            setShowEditModal(false);
          }}
        />
      </Modal>
    </>
  );
}
