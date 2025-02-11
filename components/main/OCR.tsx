"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  setExtractedText: Dispatch<SetStateAction<string>>;
};

const OCR: React.FC<Props> = ({ setExtractedText }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));

      setImages((prevImages) => {
        const newImages = [...prevImages, ...imageUrls].slice(0, 20); // Limit to 20 images
        return newImages;
      });
    }
  };

  const handleOCR = async () => {
    if (images.length === 0) return;
    setLoading(true);

    const ocrPromises = images.map((imageSrc) =>
      Tesseract.recognize(imageSrc, "eng", {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => text)
        .catch(() => "Error processing image")
    );

    const results = await Promise.allSettled(ocrPromises);
    let stringResult = "";

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        stringResult += result.value + "\n";
      }
    });

    setExtractedText(stringResult);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="pictures">Upload Images:</Label>
        <Input
          id="pictures"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleOCR}
          disabled={images.length === 0 || loading}
          className="disabled:opacity-50"
        >
          {loading ? "Processing..." : "Run OCR"}
        </Button>
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Previews:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, index) => (
              <Image
                width={150}
                height={150}
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="border rounded object-cover"
              />
            ))}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default OCR;
