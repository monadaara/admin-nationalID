import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import CustomForm from "../components/common/Form";

import { centerFields } from "../components/common/Schema";
import { useMutation, useQueryClient } from "react-query";
import { updateCenter, updateCenterLocation } from "../service/centers";
import { toast } from "react-toastify";

const UpdateCenterModel = ({
  onHide,
  show,
  users,
  userIsLoading,
  center_data,
  register,
  setValue,
  handleSubmit,
  errors,
  options,
}) => {
  const queryClient = useQueryClient();
  const locationMutation = useMutation((data) => updateCenterLocation(data));
  const centerMutation = useMutation((data) => updateCenter(data));

  const onSubmit = (data) => {
    locationMutation.mutate(
      {
        name: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        location_id: center_data.location.id,
      },
      {
        onSuccess: (location) => {
          let obj = { ...data };
          delete obj.location;
          console.log("obj", obj);
          centerMutation.mutate(
            {
              ...obj,
              status: data.status == true ? "active" : "blocked",
              center_id: center_data.id,
              location: location.id,
            },
            {
              onSuccess: (data) => {
                toast.success("center updated succesfuly.", {
                  theme: "colored",
                });

                queryClient.invalidateQueries(["centers"]);
                onHide();
              },
              onError: (error) => {
                const { manager } = error.response.data;
                toast.error(manager[0], { theme: "colored" });
              },
            }
          );
        },
      }
    );
  };

  useEffect(() => {
    if (!centerFields.some((field) => field.type === "switch")) {
      centerFields.push({ label: "Status", type: "switch", name: "status" });
    }
  }, [show]);

  return (
    <Modal isOpen={show} onClose={onHide}>
      <ModalOverlay />
      <ModalContent width="800px" maxW="90%">
        <ModalHeader>Updating center</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="grid grid-cols-2 gap-x-10">
              <CustomForm
                fields={centerFields}
                register={register}
                errors={errors}
                options={options}
                setValue={setValue}
                data={center_data}
              />
            </div>
            <ModalFooter>
              <Button className="mr-4" colorScheme="red" onClick={onHide}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" mr={3}>
                Update Center
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCenterModel;
