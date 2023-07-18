import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteLocation, getCenters } from "./../service/centers";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import CustomTable from "../components/common/Table";
import CenterFilter from "../components/CenterFilter";
import AddCenterModel from "../models/AddCenterModel";
import { get_users } from "../service/admin";
import UpdateCenterModel from "../models/updateCenterModel";
import { useForm } from "react-hook-form";
import { centerFields, centerSchema } from "../components/common/Schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";

const CenterPage = () => {
  const cancelRef = React.useRef();
  const queryClient = useQueryClient();
  const [modalShow, setModalShow] = React.useState(false);
  const [centerFilter, setCenterFilter] = React.useState({
    status: "",
    name: "",
  });
  const [deleteModalShow, setdeleteModalShow] = React.useState(false);
  const [center_data, setCenter_data] = React.useState({});
  const [updateModalShow, setUpdateModalShow] = React.useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });
  const { data: users, isLoading: userIsLoading } = useQuery({
    queryKey: ["users"],
    queryFn: get_users,
  });

  const locationMutation = useMutation((data) => deleteLocation(data));

  const columns = ["Name", "Phone", "Manager", "Location", "Status"];
  const lists = [
    {
      title: "Update center",
      onclick: () => setUpdateModalShow(true),
    },
    {
      title: "Delete center",
      onclick: () => setdeleteModalShow(true),
    },
  ];

  const centerFilteredByName =
    centerFilter.name &&
    data?.filter((center) =>
      center.name.toLowerCase().includes(centerFilter.name.toLowerCase())
    );

  const centerFilteredByStatus =
    centerFilter.status && centerFilter.status == "all"
      ? data
      : data?.filter((center) => center.status == centerFilter.status);

  let centerData = centerFilter.name
    ? centerFilteredByName
    : centerFilter.status
    ? centerFilteredByStatus
    : data;
  const centers = centerData?.map((center) => {
    return {
      Name: center?.name,
      Phone: center?.phone,
      Manager: center?.manager.first_name,
      Location: center?.location.name,
      Status: center?.status,
      ...center,
    };
  });

  const options = [];

  !userIsLoading &&
    users.forEach((user) =>
      options.push({
        value: user.id,
        label: user.first_name + " " + `(${user.username})`,
        name: "manager",
      })
    );

  useEffect(() => {
    if (center_data.id) {
      setValue("name", center_data.name);
      setValue("phone", center_data.phone);
      setValue("start_time", center_data.start_time);
      setValue("end_time", center_data.end_time);
      setValue("location", center_data.location.name);
      setValue("manager", center_data.manager.id);
      setValue("latitude", center_data.location.latitude);
      setValue("longitude", center_data.location.longitude);
      setValue("status", center_data.status == "active" ? true : false);
      setValue("process_minutes", center_data.process_minutes);

      centerFields[5].defaultValue = options.find(
        (option) => option.value === center_data.manager?.id
      );
      console.log("vaaa", centerFields);
    }
  }, [center_data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: joiResolver(centerSchema) });

  return (
    <div className="">
      <CenterFilter
        setCenterFilter={setCenterFilter}
        setModalShow={setModalShow}
      />

      <div className="bg-slate-200 ">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">Centers</h3>
      </div>
      <CustomTable
        setModal_data={setCenter_data}
        columns={columns}
        data={centers}
        lists={lists}
      />

      <AddCenterModel
        users={users}
        userIsLoading={userIsLoading}
        show={modalShow}
        onHide={() => setModalShow(false)}
        centerFields={centerFields}
      />
      <UpdateCenterModel
        users={users}
        userIsLoading={userIsLoading}
        show={updateModalShow}
        center_data={center_data}
        onHide={() => setUpdateModalShow(false)}
        register={register}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
        centerFields={centerFields}
      />

      <AlertDialog
        isOpen={deleteModalShow}
        leastDestructiveRef={cancelRef}
        onClose={() => setdeleteModalShow(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Center
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setdeleteModalShow(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  locationMutation.mutate(center_data.location.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries(["centers"]);
                      toast.success("center deleted.", { theme: "colored" });
                      setdeleteModalShow(false);
                    },
                  });
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default CenterPage;
