import { MouseEventHandler } from "react";
import Image from "next/image";
import { BsXCircleFill } from "react-icons/bs";

interface ImageChipProps {
  text?: string;
  alt?: string;
  url?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function ImageChip({
  text,
  alt = "Uploaded image",
  url = "",
  onClick
}: ImageChipProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article
      className="relative aspect-square h-32 w-32 rounded shadow-inner"
      onClick={(e) => e.preventDefault()}
    >
      <header className="absolute z-10 flex w-full justify-between p-1">
        <p className="overflow-hidden text-ellipsis text-xs text-white">
          {text}
        </p>
        <button
          className="opacity-75 hover:opacity-100"
          type="button"
          onClick={onClick}
        >
          <BsXCircleFill className="text-white" />
        </button>
      </header>
      {/* Overlay */}
      <div className="relative h-full w-full rounded">
        <Image className="rounded object-cover" alt={alt} src={url} fill />
        <div className="absolute h-full w-full rounded bg-black opacity-25 transition hover:opacity-50" />
      </div>
    </article>
  );
}
