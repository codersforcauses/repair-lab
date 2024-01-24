import { useState } from "react";
import Image from "next/image";

import Modal from "@/components/Modal/index";

export type CardProps = {
  title: string;
  description: string;
  date: string;
  location: string;
  handleClick?: () => void;
};

export default function Card({ props }: { props: CardProps }) {
  function handleClick() {
    setShowModal(true);
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={props.handleClick ? props.handleClick : handleClick}
      onKeyDown={props.handleClick ? props.handleClick : handleClick}
      role="presentation"
      className="h-full w-full group col-span-1 max-w-xs flex-col overflow-hidden rounded-lg bg-grey-100 shadow-md transition hover:-translate-y-0.5 hover:cursor-pointer hover:bg-grey-50"
    >
      <Modal setShowPopup={setShowModal} showModal={showModal}>
        <div>Text!!! {props.title}</div>
        <div>{props.date}</div>
        <div>{props.description}</div>
      </Modal>
      <div>
        <Image
          src="/images/event_details.jpg"
          alt="Image Not Found"
          className="object-fit max-h-32 w-full"
          width={100}
          height={100}
        />
      </div>

      <div className="text-center line-clamp-6">
        <h1 className="text-xl font-bold">{props.title}</h1>
        <h2 className="text-l italic">
          {props.date} - {props.location}
        </h2>
        <div>{props.description}</div>
      </div>
    </div>
  );
}
