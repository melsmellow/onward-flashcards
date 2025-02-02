"use client";

import { useRef, useState } from "react";
import Tesseract from "tesseract.js";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CameraPreview from "./CameraPreview";

type Props = {};

const OCR: React.FC<Props> = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageSrc(URL.createObjectURL(file)); // Preview uploaded image
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }, // Requesting the back camera
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera Error:", error);
      alert("Failed to access the camera.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setImageSrc(dataUrl); // Set preview from camera capture


        // Stop the camera stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleOCR = async () => {
    if (!imageSrc) return;

    setLoading(true);
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(
        imageSrc, // Can accept Base64 or File URLs
        "eng",
        {
          logger: (info) => console.log(info), // Progress updates
        }
      );
      setText(text);
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-16 ">
      <div className="mb-4">
        <Label htmlFor="picture">Upload Image:</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log(e);
            handleImageUpload(e);
          }}
          //   onChange={handleImageUpload}
        />
      </div>
      <div className=" flex gap-2">
        <Button
          onClick={handleOCR}
          disabled={!imageSrc || loading}
          className="disabled:opacity-50"
        >
          {loading ? "Processing..." : "Run OCR"}
        </Button>
        <CameraPreview
          videoRef={videoRef}
          captureImage={captureImage}
          startCamera={startCamera}
        />
      </div>

      {imageSrc && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Preview:</h2>
          <img src={imageSrc} alt="Preview" className="border rounded" />
        </div>
      )}

      {text && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Extracted Text:</h2>
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default OCR;
