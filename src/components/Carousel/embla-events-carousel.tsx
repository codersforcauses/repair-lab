import React, { useCallback } from "react";
import Image from "next/image";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from "@/components/Carousel/embla-carousel-arrow-button";
import { useEvents } from "@/hooks/events";
import { EventResponse } from "@/types";

import { DotButton, useDotButton } from "./embla-carousel-dot-button";

type PropType = {
  events?: EventResponse[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = () => {
  // const { events, options } = props; Unused props because events are self-managed for now

  const { data } = useEvents({
    sortKey: "startDate",
    sortMethod: "desc",
    eventStatus: ["UPCOMING"],
    page: 1,
    perPage: 8
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

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

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data?.items.map((event, index) => (
            <div className="embla__slide" key={index}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1 mt-4">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

const EventCard: React.FC<{ event: EventResponse }> = ({ event }) => {
  return (
    <>
      <div className="h-52 relative rounded-t-lg bg-slate-600 hover:cursor-pointer">
        <Image
          src="/images/jeans_repair.jpg" // TODO EventResponse doesn't have an image field
          alt="A person repairing jeans"
          layout="fill"
          objectFit="contain"
          className="rounded-t-lg"
        />
      </div>

      <div className="rounded-b-lg bg-grey-100 pt-2 text-center text-xl select-none">
        <span className="pb-10 font-bold">{event.name}</span>
        <div className="pt-2 text-sm h mb-2 h-32 text-ellipsis">
          <h1 className="font-bold">{event.location}</h1>
          <h2>
            {new Date(event.startDate).toDateString()} -{" "}
            {new Date(event.endDate).toDateString()}
          </h2>
          <p className="pb-3 pl-10 pr-10 pt-2">{event.description}</p>
        </div>
        <div className="pb-3">
          <h2>DISCLAIMER</h2>
          <p className="text-sm">{event.disclaimer}</p>
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
