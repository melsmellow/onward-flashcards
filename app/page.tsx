import FlashcardsGenerator from "@/components/main/FlashcardsGenerator";
import OCR from "@/components/main/OCR";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {

  return (
    <div className="flex gap-2 flex-col">
      <Card className="w-full mx-auto lg:w-[50vw]">
        <CardHeader>
          <CardTitle>OCR</CardTitle>
          <CardDescription>Sample OCR using Tesseract</CardDescription>
        </CardHeader>
        <CardContent>
          <OCR />
        </CardContent>
      </Card>
      <Card className="w-full mx-auto lg:w-[50vw] ">
        <CardHeader>
          <CardTitle>Flash Card generator</CardTitle>
          <CardDescription>Sample of flashcards generator</CardDescription>
        </CardHeader>
        <CardContent>
          <FlashcardsGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
