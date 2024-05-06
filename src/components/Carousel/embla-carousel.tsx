import React, { useCallback } from "react";
import Image from "next/image";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { Event } from "@/types";

import { DotButton, useDotButton } from "./embla-carousel-button";

type PropType = {
  events?: Event[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { events, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const this_events = props.events || [
    {
      id: "1",
      createdAt: new Date("2022-03-14T00:00:00.000Z"),
      updatedAt: new Date("2022-03-14T00:00:00.000Z"),
      startDate: new Date("2022-03-14T00:00:00.000Z"),
      endDate: new Date("2022-03-14T00:00:00.000Z"),
      status: "UPCOMING",
      createdBy: "Juan Dela Cruz",
      eventType: "Clothing Repair Workshop",
      disclaimer: "OONGA BOONGA DISCLAIMER",
      name: "Clothing Repair Workshop",
      description:
        "Have any torned clothes? Bring them to our clothing repair!",
      location: "Joombabab"
    },
    {
      id: "2",
      createdAt: new Date("2022-03-14T00:00:00.000Z"),
      updatedAt: new Date("2022-03-14T00:00:00.000Z"),
      startDate: new Date("2022-03-14T00:00:00.000Z"),
      endDate: new Date("2022-03-14T00:00:00.000Z"),
      status: "UPCOMING",
      createdBy: "Jimmy Bob",
      eventType: "Bike Repair Workshop",
      disclaimer: "OONGA BOONGA DISCLAIMER",
      name: "Bike Repair Workshop",
      description: "Have any torned bikes? Bring them to our bike repair!",
      location: "Perth"
    },
    {
      id: "3",
      createdAt: new Date("2022-03-14T00:00:00.000Z"),
      updatedAt: new Date("2022-03-14T00:00:00.000Z"),
      startDate: new Date("2022-03-14T00:00:00.000Z"),
      endDate: new Date("2022-03-14T00:00:00.000Z"),
      status: "ONGOING",
      createdBy: "Jumbo Slice",
      eventType: "Computer Repair Workshop",
      disclaimer: "OONGA BOONGA DISCLAIMER",
      name: "Computer Repair Workshop",
      description:
        "Have any torned computers? Bring them to our computer repair!",
      location: "Mars"
    }
  ];

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {this_events.map((event, index) => (
            <div className="embla__slide w-full z-auto" key={index}>
              <div className="w-full h-52 relative rounded-t-lg bg-slate-600 hover:cursor-pointer">
                <Image
                  src="/images/jeans_repair.jpg"
                  alt="A person repairing jeans"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-t-lg"
                />
              </div>

              <div className="rounded-b-lg bg-grey-100 pt-2 text-center text-xl">
                <span className="pb-10 font-bold">{event.name}</span>
                <div className="pt-2 text-sm">
                  <h1 className="font-bold">{event.location}</h1>
                  <h2>
                    {event.startDate.toDateString()} -{" "}
                    {event.endDate.toDateString()}
                  </h2>
                  <p className="pb-3 pl-10 pr-10 pt-2">{event.description}</p>
                </div>
                <div>
                  <h2>DISCLAIMER</h2>
                  <p className="text-sm">{event.disclaimer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1 mt-4">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
