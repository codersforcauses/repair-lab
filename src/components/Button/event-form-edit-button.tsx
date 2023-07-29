import { useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemType } from "@prisma/client";

import PrepopulatedEventForm from "@/components/Forms/prepopulated-event-form";
import Modal from "@/components/Modal";

export default function EventFormEditButton({
  props,
  itemTypes
}: {
  props: Event;
  itemTypes: ItemType[];
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  function handleEditEvent() {
    setShowEditModal(true);
  }
  return (
    <>
      <button onClick={() => handleEditEvent()}>
        <FontAwesomeIcon icon={faPencil} />
      </button>
      <Modal
        setShowPopup={setShowEditModal}
        showModal={showEditModal}
        height="h-3/4"
      >
        <PrepopulatedEventForm props={props} itemTypes={itemTypes} />
      </Modal>
    </>
  );
}
