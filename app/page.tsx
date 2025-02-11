"use client";
import FlashcardsGenerator from "@/components/main/FlashcardsGenerator";
import OCR from "@/components/main/OCR";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [extractedText, setExtractedText] = useState<string>("");


  return (
    <div className="flex gap-2 flex-col">
      <Card className="w-full mx-auto lg:w-[50vw]">
        <CardHeader>
          <CardTitle>OCR</CardTitle>
          <CardDescription>Sample OCR using Tesseract</CardDescription>
        </CardHeader>
        <CardContent>
          <OCR setExtractedText={setExtractedText} />
        </CardContent>
      </Card>
      <Card className="w-full mx-auto lg:w-[50vw] ">
        <CardHeader>
          <CardTitle>Flash Card generator</CardTitle>
          <CardDescription>Sample of flashcards generator</CardDescription>
        </CardHeader>
        <CardContent>
          <FlashcardsGenerator extractedText={extractedText} />
        </CardContent>
      </Card>
    </div>
  );
}
