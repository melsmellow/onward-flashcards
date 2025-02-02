import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { FC, RefObject, useState } from "react";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(true);
            startCamera;
          }}
        >
          Use Camera
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md w-[90vw] h-[90vh]">
        <div className="relative">
          <video ref={videoRef} className="w-full h-full " autoPlay />
          <div className="rounded">
            <Image
              className="fixed bottom-[20px] left-1/2 -translate-x-1/2"
              onClick={() => {
                captureImage;
                setIsOpen(false);
              }}
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
