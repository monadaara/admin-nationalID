import React from "react";
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
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import CustomForm from "../components/common/Form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { centerSchema } from "../components/common/Schema";
import { useMutation, useQueryClient } from "react-query";
import { setCenter, setCenterLocation, setDays } from "../service/centers";
import { toast } from "react-toastify";

const AddCenterModel = ({
  onHide,
  show,
  users,
  userIsLoading,
  centerFields,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: joiResolver(centerSchema) });

  const daysOfWeek = [
    { short: "Sun", long: "Sunday" },
    { short: "Mon", long: "Monday" },
    { short: "Tue", long: "Tuesday" },
    { short: "Wed", long: "Wednesday" },
    { short: "Thu", long: "Thursday" },
    { short: "Fri", long: "Friday" },
    { short: "Sat", long: "Saturday" },
  ];

  const queryClient = useQueryClient();
  const locationMutation = useMutation((data) => setCenterLocation(data));
  const centerMutation = useMutation((data) => setCenter(data));

  const daysMutation = useMutation((data) => setDays(data));

  const onSubmit = (data) => {
    let days = [];

    locationMutation.mutate(
      {
        name: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
      },
      {
        onSuccess: (location) => {
          centerMutation.mutate(
            {
              ...data,
              location: location.id,
            },
            {
              onSuccess: (center) => {
                data.days.forEach((day) => {
                  days.push({ name: day, center: center.id });
                });

                daysMutation.mutate(days);
                toast.success("center created succesfuly.", {
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

  const options = [];

  !userIsLoading &&
    users?.forEach((user) =>
      options.push({
        value: user.id,
        label: user.first_name + " " + `(${user.username})`,
        name: "manager",
      })
    );

  centerFields[5].options = options;

  if (centerFields.some((field) => field.type === "switch")) {
    centerFields = centerFields.filter((field) => field.type !== "switch");
  }

  return (
    <Modal isOpen={show} onClose={onHide}>
      <ModalOverlay />
      <ModalContent width="800px" maxW="90%">
        <ModalHeader>Creating center</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="grid grid-cols-2 gap-x-10">
              <CustomForm
                fields={centerFields}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>

            <div className="my-3">
              {daysOfWeek.map((day) => {
                return (
                  <Checkbox
                    key={day.short}
                    value={day.short}
                    className="mr-5"
                    {...register("days")}
                    // defaultChecked
                  >
                    {day.long}
                  </Checkbox>
                );
              })}
            </div>
            <ModalFooter>
              <Button className="mr-4" colorScheme="red" onClick={onHide}>
                Close
              </Button>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save Center
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddCenterModel;
