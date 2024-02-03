import { useState } from "react";
import Image from "next/image";
import { Map, Marker } from "pigeon-maps"

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
      className="h-full w-full group col-span-1 max-w-xs flex-col overflow-hidden rounded-lg bg-grey-100 shadow-md transition hover:shadow-2xl hover:-translate-y-0.5 hover:cursor-pointer hover:bg-app-primary"
    >
      <Modal setShowPopup={setShowModal} showModal={showModal}>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <h2 className="text-xl italic">
            {props.date} - {props.location}
          </h2>
          <p>{props.description}</p>

          <Map height={500} defaultCenter={[-31.95, 115.86]} defaultZoom={13}>
            <Marker width={40} anchor={[-31.95, 115.86]} />
          </Map>
        
        </div>

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
