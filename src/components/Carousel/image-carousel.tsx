import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";

export type ImageCarouselProps = { images: string[] };

/**
 * Renders a carousel component that displays a series of images one at a time, along with navigational features.
 *
 * @component
 * @param {string[]} images - An array of image URLs.
 * @returns {JSX.Element} The rendered carousel component.
 */
export default function ImageCarousel({ ...props }: ImageCarouselProps) {
  const [imageIndex, setCurrentImageIndex] = useState(0);
  const hasimages = props.images.length > 0;

  // Styles
  const baseSliderStyle =
    "w-5 h-5 mx-1 rounded-full self-center cursor-pointer";
  const unselectedSliderStyle =
    baseSliderStyle + " text-gray-400 transition hover:text-gray-300";
  const selectSliderStyle =
    baseSliderStyle + " text-primary-500 transition hover:text-primary-400";

  const buttonSize = 30;
  const buttonStyle =
    "text-primary-500 hover:text-primary-400 transition onclick:transform onclick:scale-110";

  // If no images, display a message
  if (!hasimages)
    return (
      <>
        <div className=" m-36">
          <h1 className="text-xl text-center">
            No Images for this Repair Request
          </h1>
        </div>
      </>
    );
  return (
    <>
      <div className="flex flex-row relative gap-2 w-full h-80">
        <div className="w-3/4 h-full flex flex-row relative m-auto">
          <Image
            key={imageIndex}
            src={props.images[imageIndex]}
            alt={"cardImage" + imageIndex}
            layout="fill"
            objectFit="contain"
            className="transition-opacity opacity-0 duration-150 hover:cursor-pointer"
            onLoadingComplete={(image) => {
              image.classList.remove("opacity-0");
            }}
            onClick={() => window.open(props.images[imageIndex], "_blank")}
          />
        </div>

        <button
          className="absolute top-1/2 left-0"
          onClick={() =>
            setCurrentImageIndex(
              (prev) => (prev - 1 + props.images.length) % props.images.length
            )
          }
        >
          <FaChevronLeft size={buttonSize} className={buttonStyle} />
        </button>
        <button
          className="absolute top-1/2 right-0 "
          onClick={() =>
            setCurrentImageIndex((prev) => (prev + 1) % props.images.length)
          }
        >
          <FaChevronRight size={buttonSize} className={buttonStyle} />
        </button>
      </div>
      <div className="flex flex-row justify-center w-full mt-2">
        {props.images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            role="presentation"
          >
            <IoMdRadioButtonOn
              className={
                index == imageIndex ? selectSliderStyle : unselectedSliderStyle
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
