"use client";
import {
  generateFlashcardsFromText,
  reconstructExtractedText,
} from "@/app/actions";
import { useFlashcardStore } from "@/store/flashcardStore";
import { Flashcard } from "@/types/global";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface FlashcardsGeneratorProps {
  extractedText: string;
}

const FlashcardsGenerator: FC<FlashcardsGeneratorProps> = ({
  extractedText,
}) => {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  useEffect(() => {
    setTopic(extractedText);
  }, [extractedText]);

  const [numQuestions, setNumQuestions] = useState<string>("5");
  const [loadingText, setLoadingText] = useState<string>("Please wait");
  const [flashcardResult, setFlashcards] = useState<Flashcard[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { setFlashcardData, flashCardData } = useFlashcardStore();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setLoadingText("Please Wait");

    try {
      // Step 1: Structure the extracted text
      setLoadingText("0 out of 2: Summarizing your inputs");
      const structuredText = await reconstructExtractedText(extractedText);
      setLoadingText("1 out of 2: Generating Flashcards");
      // Step 2: Generate flashcards from structured text
      const flashcards = await generateFlashcardsFromText(
        structuredText.replace(/\n/g, " "),
        Number(numQuestions)
      );

      console.log(flashcards);
      if (Array.isArray(flashcards) && flashcards.length > 0) {
        transformFlashcards(flashcards);
        setIsGenerating(false);
        return;
      }
    } catch (error) {
      alert("Failed to generate, please try again");
    }

    setIsGenerating(false);
  };

  const transformFlashcards = (data: string[]): void => {
    const flashcards: Omit<Flashcard, "number" | "uuid">[] = [];
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
      uuid: uuidv4(),
    }));
    // Now you can set the state with the updated flashcards
    setFlashcards(newArr);
    setFlashcardData(newArr);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    const value = e.target.value;

    // Remove non-numeric characters except the decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, "");

    // Remove leading zeros except when followed by a decimal
    const formattedValue = sanitizedValue.replace(/^0+(?=\d)/, "");

    // Convert to number and ensure it's ≤ 20
    const numericValue = parseFloat(formattedValue);

    if (!isNaN(numericValue) && numericValue > 20) {
      setter("20"); // Cap at 20
    } else {
      setter(formattedValue);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <Input
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
        placeholder="Topic"
      /> */}
      <Textarea
        className="h-[50vh]"
        placeholder="Type your message here."
        id="message-2"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />
      <Input
        onChange={(e) => handleInputChange(e, setNumQuestions)}
        inputMode="decimal"
        type="text"
        value={numQuestions}
        placeholder="Number of questions to generate"
      />
      {isGenerating ? (
        <Button disabled>
          <Loader2 className="animate-spin" />
          {loadingText}
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
