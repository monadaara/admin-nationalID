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

const UserModal = ({
  onHide,
  show,
  centers,
  centerIsloading,
  users_data,
  register,
  setValue,
  handleSubmit,
  errors,
  is_updating,
  userFields,
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

  userFields[6].options = options;

  if (is_updating) {
    
    userFields = userFields.filter((field) => field.name !== "password");
    userFields[5].defaultValue = options.find(
      (option) => option.value === users_data.center?.id
    );
  } else {
    userFields[6].defaultValue = "";
  }

  // console.log("userFields", userFields);
  return (
    <Modal isOpen={show} onClose={onHide}>
      <ModalOverlay />
      <ModalContent width="800px" maxW="90%">
        <ModalHeader>
          {" "}
          {is_updating ? "Update User" : "Create User"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="grid grid-cols-2 gap-x-10">
              <CustomForm
                fields={userFields}
                register={register}
                errors={errors}
                options={options}
                setValue={setValue}
                data={users_data}
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

export default UserModal;
