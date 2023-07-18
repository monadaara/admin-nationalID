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
import CustomForm from "../components/common/Form";

import { useMutation } from "react-query";
import { setDevice, updateDevice } from "../service/device";
import { toast } from "react-toastify";

const DeviceModal = ({
  onHide,
  show,
  centers,
  centerIsloading,
  device_data,
  register,
  setValue,
  header,
  handleSubmit,
  errors,
  is_updating,
  deviceFields,
  onSubmit,
}) => {
  const options = [];

  !centerIsloading &&
    centers.forEach((center) =>
      options.push({
        value: center.id,
        label: center.name,
        name: "center",
      })
    );

  const options1 = [
    {
      value: "fingerprint",
      label: "Fingerprint Scanner",
      name: "type",
    },
    {
      value: "camera",
      label: "Camera",
      name: "type",
    },
    {
      value: "iris_scanner",
      label: "Iris Scanner",
      name: "type",
    },
  ];

  deviceFields[1].options = options1;
  deviceFields[2].options = options;

  if (is_updating) {
    deviceFields[1].defaultValue = options1.find(
      (option) => option.value === device_data.type
    );
    deviceFields[2].defaultValue = options.find(
      (option) => option.value === device_data.center?.id
    );
  } else {
    deviceFields[1].defaultValue = "";
    deviceFields[2].defaultValue = "";
  }

  if (is_updating && !deviceFields.some((field) => field.type === "switch")) {
    deviceFields.push({ label: "Status", type: "switch", name: "status" });
  } else if (
    !is_updating &&
    deviceFields.some((field) => field.type === "switch")
  ) {
    deviceFields = deviceFields.filter((field) => field.type !== "switch");
  }
  return (
    <Modal isOpen={show} onClose={onHide}>
      <ModalOverlay />
      <ModalContent width="800px" maxW="90%">
        <ModalHeader>
          {" "}
          {is_updating ? "Update device" : "Create device"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="grid grid-cols-2 gap-x-10">
              <CustomForm
                fields={deviceFields}
                register={register}
                errors={errors}
                options={options}
                setValue={setValue}
                data={device_data}
              />
            </div>
            <ModalFooter>
              <Button className="mr-4" colorScheme="red" onClick={onHide}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" mr={3}>
                {is_updating ? " Update" : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeviceModal;
