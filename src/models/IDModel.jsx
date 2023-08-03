import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";

import idcover from "/idcover.png";
import flag from "/flag.png";
import cover from "/cover.jpg";

const IDModal = ({ onHide, show, ids, idsMutation, is_approve }) => {
  return (
    <Modal isOpen={show} size={"xl"} onClose={onHide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>National ID</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col justify-center items-center gap-y-10 font-poppins ">
            <div className="h-[300px] w-[450px] relative">
              <img className="w-full h-full" src={idcover} alt="" />
              <div className="absolute top-0 left-0 right-0 px-4 py-4">
                <div className="flex justify-start gap-x-3 items-center ">
                  <img className="w-16" src={flag} alt="" />
                  <h1 className="text-1xl font-bold">
                    Somali National ID card
                  </h1>
                </div>

                <div className="flex justify-start items-center gap-x-10">
                  <div className="w-[28] h-32 border-2 mt-5">
                    <img
                      className="w-28 h-32 object-cover"
                      src={ids?.applicant?.image.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="mb-1">
                      <p className="font-light text-xs text-bluelight">
                        National ID
                      </p>
                      <p className="text-xs font-medium">So-{ids?.id}</p>
                    </div>
                    <div className="mb-1">
                      <p className="font-light text-xs text-bluelight">
                        Full Name
                      </p>
                      <p className="text-xs font-medium">
                        {ids?.applicant?.first_name +
                          " " +
                          ids?.applicant?.middle_name +
                          " " +
                          ids?.applicant?.last_name}
                      </p>
                    </div>
                    <div className="mb-1">
                      <p className="font-light text-xs text-bluelight">
                        Date Of Birth
                      </p>
                      <p className="text-xs font-medium">
                        {ids?.applicant?.date_of_birth}
                      </p>
                    </div>
                    <div className="mb-1 flex justify-start gap-10 items-center">
                      <div>
                        <p className="font-light text-xs text-bluelight">
                          Nationality
                        </p>
                        <p className="text-xs font-medium">
                          {ids?.applicant?.residence}
                        </p>
                      </div>
                      <div>
                        <p className="font-light text-xs text-bluelight">Sex</p>
                        <p className="text-xs font-medium">
                          {ids?.applicant?.sex == "m" ? "Male" : "Female"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-center items-center ms-16 mb-3 ">
                  <p className="font-normal text-sm p-0 m-0  ">
                    {ids?.mrz_code}
                  </p>
                </div>
              </div>
            </div>
            {/* back */}
            <div className="h-[300px] w-[450px] relative mb-5">
              <img className="w-full h-full" src={idcover} alt="" />
              <div className="absolute top-0 left-0 right-0 px-4 py-4">
                <div className="flex justify-center h-full  gap-x-3 items-center ">
                  <div></div>
                  <div className="mt-10 flex justify-center mr-7">
                    <img
                      className="w-1/2"
                      src={ids?.applicant?.qrcode?.qr_code}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="mr-4" colorScheme="red" onClick={onHide}>
            Close
          </Button>
          {!is_approve && (
            <Button
              onClick={() => {
                idsMutation.mutate({
                  national_id: ids?.id,
                  approved: true,
                });
              }}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Approve
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default IDModal;
