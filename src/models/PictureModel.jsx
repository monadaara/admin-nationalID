import { useRef, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import Webcam from "react-webcam";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PictureModel = ({ onHide, show, imageMutation }) => {
  const webcamRef = useRef(null);
  const [capturedImageSrc, setCapturedImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the captured image

    // Resize the captured image to national ID size
    const canvas = document.createElement("canvas");
    canvas.width = 600; // Width in pixels for the national ID size
    canvas.height = 400; // Height in pixels for the national ID size
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resizedImageSrc = canvas.toDataURL("image/jpeg");

      imageMutation.mutate(resizedImageSrc);

      setCapturedImageSrc(resizedImageSrc); // Store the resized image in state
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    // This effect is empty since we only need to use the webcam without face detection
  }, []);

  return (
    <Modal isOpen={show} size={"xl"} onClose={onHide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Take image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <Webcam
              className="w-full"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="mr-4" colorScheme="red" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" colorScheme="blue" mr={3} onClick={capture}>
            {imageMutation.isLoading && (
              <span>
                <AiOutlineLoading3Quarters className="animate-pulse" />
              </span>
            )}
            Capture
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* Display the captured image */}
    </Modal>
  );
};

export default PictureModel;
