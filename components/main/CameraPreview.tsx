import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FC, RefObject } from "react";
interface CameraPreview {
  captureImage: () => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  startCamera: () => Promise<void>;
}

const CameraPreview: FC<CameraPreview> = ({
  captureImage,
  videoRef,
  startCamera,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={startCamera}>Take Picture with Camera</Button>
      </DialogTrigger>
      <DialogContent className="rounded-md w-[90vw] h-[90vh]">
        <div className="relative">
          <video ref={videoRef} className="w-full h-full " autoPlay />
          <div className="rounded">
            <Image
           className="fixed bottom-[20px] left-1/2 -translate-x-1/2"
              // onClick={captureImage}
              src="/icon/capture-icon.png"
              width={50}
              height={50}
              alt="capture-icon"
            />
          </div>
        </div>

        {/* <Button onClick={captureImage} className="rounded"></Button> */}
      </DialogContent>
    </Dialog>
  );
};

export default CameraPreview;
