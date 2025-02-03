import React, { FC } from "react";
import { Flashcard } from "./FlashcardsGenerator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface FlashCardProps {
  data: Flashcard;
  index: number;
}

const FlashCard: FC<FlashCardProps> = ({ data , index}) => {
  const { question, answer } = data;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Question: {index + 1} {question}
        </CardTitle>
        <CardDescription>Answer: {answer}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default FlashCard;
