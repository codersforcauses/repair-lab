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
      className="h-full w-full group col-span-1 max-w-xs flex-col overflow-hidden rounded-lg bg-grey-100 shadow-md transition hover:shadow-2xl hover:-translate-y-0.5 hover:cursor-pointer "
    >
      <Modal setShowPopup={setShowModal} showModal={showModal}>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <h2 className="text-xl italic">
            {props.date} - {props.location}
          </h2>
          <p>{props.description}</p>
        </div>
      </Modal>
      <div className="relative ">
        <Image
          src="/images/event_details.jpg"
          alt="Image Not Found"
          className="object-fit max-h-32 w-full group-hover:opacity-50"
          width={100}
          height={100}
        />
        <div className="opacity-0 group-hover:opacity-70 absolute inset-0 flex justify-center items-center text-2xl text-black text-center font-semibold">
          See more {">"}
        </div>
      </div>

      <div className="text-center line-clamp-6 h-full group-hover:bg-app-primary">
        <h1 className="text-xl font-bold">{props.title}</h1>
        <h2 className="text-l italic">
          {props.date} - {props.location}
        </h2>
        <div>{props.description}</div>
      </div>
    </div>
  );
}
