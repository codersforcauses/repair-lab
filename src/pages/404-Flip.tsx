import { useEffect, useState } from "react";
import React from "react";
import { FaGear, FaLaptop, FaWrench } from "react-icons/fa6";
import { GiSewingString } from "react-icons/gi";

import NavBar from "@/components/NavBar";

type Card = "gear" | "wrench" | "needle" | "laptop";

const iconMap = {
  gear: FaGear,
  wrench: FaWrench,
  needle: GiSewingString,
  laptop: FaLaptop
};

export default function NotFound() {
  const cardOptions: Card[] = ["gear", "wrench", "needle", "laptop"];

  const [cards, setCards] = useState<Card[]>([...cardOptions, ...cardOptions]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setCards(shuffle([...cards])), []);

  const flipCard = (index: number) => {
    if (flippedCards.length >= 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    // If the user has opened two cards, wait before checking
    if (newFlipped.length == 2) {
      setTimeout(() => {
        if (cards[newFlipped[0]] === cards[newFlipped[1]])
          setMatchedCards((matchedCards) => [...matchedCards, ...newFlipped]);
        setFlippedCards([]);
      }, 750);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex w-full h-[100vh] justify-center  items-center absolute top-0 left-0">
        <div className="text-[10rem] text-primary-600 h-fit">404</div>
      </div>
      <div className="w-[50%] ml-auto mr-auto flex">
        {cards.map((card, index) => (
          <FlipCard
            key={index}
            cardType={card}
            flipCard={() => flipCard(index)}
            cardState={
              matchedCards.includes(index)
                ? "matched"
                : flippedCards.includes(index)
                  ? "flipped"
                  : "normal"
            }
          />
        ))}
      </div>
    </>
  );
}

function FlipCard({
  cardType,
  cardState,
  flipCard
}: {
  cardType: Card;
  flipCard: () => void;
  cardState: "normal" | "flipped" | "matched";
}) {
  return (
    <button
      className={`w-20 h-20 m-2 flex-shrink-0 flex-grow-0 text-white text-5xl group ${
        cardState === "matched" ? "pointer-events-none" : ""
      }`}
      style={{ perspective: "1000px" }}
      onClick={flipCard}
    >
      {cardState !== "matched" && (
        <div className="drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)] absolute top-0 left-0 w-full h-full bg-white rounded-md" />
      )}
      <div
        className={`relative w-full h-full transition-[1s] [transformStyle:preserve-3d] ${
          cardState === "flipped" ? "[transform:rotateY(180deg)]" : ""
        } ${cardState === "matched" ? "opacity-0" : ""}`}
      >
        <div className="bg-white w-full h-full flex justify-center items-center rounded-md absolute top-0 left-0 [backface-visibility:hidden] [transformStyle:preserve-3d]">
          ?
        </div>
        <div className="bg-primary-500 w-full h-full flex justify-center items-center rounded-md absolute top-0 left-0 [backface-visibility:hidden] [transform:rotateY(180deg)] [transformStyle:preserve-3d]">
          {React.createElement(iconMap[cardType], {
            className: "w-10 h-10"
          })}
        </div>
      </div>
    </button>
  );
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}
