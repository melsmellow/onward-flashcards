"use client";
import { generateFlashcards } from "@/app/actions";
import { useFlashcardStore } from "@/store/flashcardStore";
import { Flashcard } from "@/types/global";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FlashcardsGeneratorProps {}

const FlashcardsGenerator: FC<FlashcardsGeneratorProps> = ({}) => {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [flashcardResult, setFlashcards] = useState<Flashcard[]>([]);

  const { setFlashcardData, flashCardData } = useFlashcardStore();

  const handleGenerate = async () => {
    const result = await generateFlashcards(topic, numQuestions);
    if (result.length > 0) {
      transformFlashcards(result);
      return;
    }
    alert("Failed to generate, please try again");
    // const flashcardsArray: Flashcard[] = transformFlashcards(result);
    // setFlashcards(flashcardsArray);
  };

  const transformFlashcards = (data: string[]): void => {
    const flashcards: Omit<Flashcard, "number">[] = [];

    for (let i = 0; i < data.length; i++) {
      const q = "Question:";
      const a = "Answer:";
      if (data[i].includes(q)) {
        const index = data[i].indexOf(q);
        const question = data[i]
          .slice(index + q.length, data[i].length)
          .replace(/\*/g, "");
        const answerIdx = data[i + 1].indexOf(a);
        const answer = data[i + 1]
          .slice(answerIdx + a.length, data[i + 1].length)
          .replace(/\*/g, "");
        flashcards.push({ question, answer });
      }
    }

    // Add number property to each flashcard
    const newArr = flashcards.map((data, idx) => ({
      ...data,
      number: idx + 1,
    }));
    // Now you can set the state with the updated flashcards
    setFlashcards(newArr);
    setFlashcardData(newArr);
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        placeholder="Topic"
      />
      <Input
        type="number"
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        value={numQuestions}
        placeholder="Number of questions to generate"
      />
      <Button
        onClick={handleGenerate}
        className="disabled:opacity-50"
        disabled={topic === ""}
      >
        Generate flash cards
      </Button>
      {flashcardResult.length > 0  && (
          <Button onClick={() => router.push("/flashcards")}>
            View flashcards
          </Button>
        )}
    </div>
  );
};

export default FlashcardsGenerator;
