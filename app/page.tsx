import OCR from "@/components/main/OCR";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="w-full mx-auto lg:w-[50vw] ">
      <CardHeader>
        <CardTitle>OCR</CardTitle>
        <CardDescription>Sample OCR using Tesseract</CardDescription>
      </CardHeader>
      <CardContent>
        <OCR />
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
}
