"use client";
import { FC, useEffect, useState } from "react";

import { useFlashcardStore } from "@/store/flashcardStore";
import Card from "./Card";
import { Flashcard } from "@/types/global";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FlashCardProps {}

const FlashCard: FC<FlashCardProps> = ({}) => {
  const router = useRouter();
  const { flashCardData } = useFlashcardStore();

  const [cards, setCard] = useState<Flashcard[]>([]);

  useEffect(() => {
    // Reorder the cards to ensure the first card is at the front of the array
    if (flashCardData && flashCardData.length > 0) {
      const newArr = structuredClone(flashCardData);
      const firstElement = newArr.shift();
      newArr.push(firstElement!);
      setCard(newArr); // Ensure it's in the correct order on the initial load
    }
  }, [flashCardData]);

  return (
    <>
      <Button
        variant="link"
        onClick={() => router.push("/")}
        className="fixed top-5 right-5 z-30"
      >
        Go back
      </Button>
      <div className="fixed inset-0 bg-[rgb(var(--background)/0.2)] backdrop-blur-md overflow-scroll grid place-items-center">
        {cards.length > 0 && (
          <>
            {cards.map((card) => {
              return (
                <Card
                  data={card}
                  key={card.uuid}
                  number={card.number}
                  setCard={setCard}
                  cards={cards}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
export default FlashCard;
