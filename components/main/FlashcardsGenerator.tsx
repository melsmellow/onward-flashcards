"use client";
import {
  generateFlashcards,
  generateFlashcardsFromExtractedText,
} from "@/app/actions";
import { useFlashcardStore } from "@/store/flashcardStore";
import { Flashcard } from "@/types/global";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";

interface FlashcardsGeneratorProps {}

const FlashcardsGenerator: FC<FlashcardsGeneratorProps> = ({}) => {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [flashcardResult, setFlashcards] = useState<Flashcard[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { setFlashcardData, flashCardData } = useFlashcardStore();

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateFlashcardsFromExtractedText(
      topic,
      numQuestions
    );
    if (result.length > 0) {
      transformFlashcards(result);
      setIsGenerating(false);
      return;
    }
    setIsGenerating(false);
    alert("Failed to generate, please try again");
    // const flashcardsArray: Flashcard[] = transformFlashcards(result);
    // setFlashcards(flashcardsArray);
  };

  const transformFlashcards = (data: string[]): void => {
    const flashcards: Omit<Flashcard, "number">[] = [];
    const filteredData = data.filter((d) => d != "");

    for (let i = 0; i < filteredData.length; i++) {
      const q = "Question:";
      const a = "Answer:";
      if (filteredData[i].includes(q)) {
        const index = filteredData[i].indexOf(q);
        const question = filteredData[i]
          .slice(index + q.length, filteredData[i].length)
          .replace(/\*/g, "");
        const answerIdx = filteredData[i + 1].indexOf(a);
        const answer = filteredData[i + 1]
          .slice(answerIdx + a.length, filteredData[i + 1].length)
          .replace(/\*/g, "");
        flashcards.push({ question, answer });
      }
    }

    // Add number property to each flashcard
    const newArr = flashcards.map((filteredData, idx) => ({
      ...filteredData,
      number: idx + 1,
    }));
    // Now you can set the state with the updated flashcards
    setFlashcards(newArr);
    setFlashcardData(newArr);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* <Input
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        placeholder="Topic"
      /> */}
      <Label htmlFor="message-2">
        Sample text input for flashcards generation
      </Label>
      <Textarea
        placeholder="Type your message here."
        id="message-2"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />
      <Input
        type="number"
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        value={numQuestions}
        placeholder="Number of questions to generate"
      />
      {isGenerating ? (
        <Button disabled>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button
          onClick={handleGenerate}
          className="disabled:opacity-50"
          disabled={topic === ""}
        >
          Generate flash cards
        </Button>
      )}

      {flashcardResult.length > 0 && (
        <Button onClick={() => router.push("/flashcards")}>
          View flashcards
        </Button>
      )}
    </div>
  );
};

export default FlashcardsGenerator;
