import { useState } from "react";
import router from "next/router";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event, ItemType } from "@prisma/client";
import { SubmitHandler } from "react-hook-form";

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
  const handleEditEvent: SubmitHandler<Event> = async (formData: any) => {
    try {
      const response = await fetch("/api/event", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        setShowEditModal(false);
        router.reload(); // Reload the page to update the event data
      }
    } catch (error) {
      console.error("An error occurred while updating the event:", error);
    }
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
        <PrepopulatedEventForm
          props={props}
          itemTypes={itemTypes}
          onSubmit={handleEditEvent}
        />
      </Modal>
    </>
  );
}
