import React, { useEffect } from "react";
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
import moment from "moment/moment";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AknowledgementModal = ({ onHide, show, data }) => {
  const downloadPDF = () => {
    const capture = document.querySelector("#pdf-content");

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save("receipt.pdf");
    });
  };
  return (
    <Modal isOpen={show} onClose={onHide}>
      <ModalOverlay />
      <ModalContent width="800px" maxW="90%">
        <ModalHeader>Aknowlegement</ModalHeader>
        <ModalCloseButton />
        <ModalBody id="pdf-content">
          <div className="w-full border-b  border-slate-500 py-7">
            <h1 className="text-3xl text-center font-medium">
              Natiola Identity System
            </h1>
          </div>
          <div className="w-full mt-2">
            <h1 className="text-2xl font-medium text-center">
              Aknowledgement Latter:
            </h1>
          </div>

          <section className="mt-5 ml-2 mr-5  flex justify-between items-center">
            <div className="">
              <p className="mb-2">
                <strong>Date: </strong>
                {moment(data.created_at).format("DD-MMMM-yyyy")}
              </p>
              <p className="mb-2">
                <strong>Transaction id: </strong>
                {data.ids.transaction_code}
              </p>
              <p className="mb-2">
                <strong>Full Name: </strong>
                {data.ids.first_name +
                  " " +
                  data.ids.middle_name +
                  " " +
                  data.ids.last_name}
              </p>
            </div>

            <div className="border border-slate-600">
              <img className="w-32 h-24  " src={data.ids.image.image} alt="" />
            </div>
          </section>

          <div className="w-full flex justify-center items-center my-16">
            <img className="text-center w-52" src={data.qr_code} alt="" />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Print
          </Button>
          <Button onClick={() => downloadPDF()} variant="ghost">
            Download
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AknowledgementModal;
