import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCenters } from "./../service/centers";
import {
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
import { useForm } from "react-hook-form";
import { deviceFields, deviceSchema } from "../components/common/Schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { getDevices, setDevice, updateDevice } from "../service/device";
import DeviceModal from "../models/DeviceModal";
import DeviceFilter from "../components/DeviceFilter";

const DevicePage = () => {
  const cancelRef = React.useRef();
  const queryClient = useQueryClient();
  const [modalShow, setModalShow] = React.useState(false);
  const [is_updating, setIs_updating] = React.useState(false);
  const [deviceFilter, setDeviceFilter] = React.useState({
    status: "all",
    name: "",
    center: "all",
  });
  const [deleteModalShow, setdeleteModalShow] = React.useState(false);
  const [device_data, setDevice_data] = React.useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: getDevices,
  });
  const { data: centers, isLoading: centerIsloading } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const deviceMutation = useMutation((data) => setDevice(data));
  const updateDeviceMutation = useMutation((data) => updateDevice(data));
  const deleteDeviceMutation = useMutation((data) => deleteDevice(data));

  const columns = ["Device", "Type", "Center", "Status"];
  const lists = [
    {
      title: "Update Device",
      onclick: () => {
        setIs_updating(true);
        setModalShow(true);
      },
    },
    {
      title: "Delete Device",
      onclick: () => setdeleteModalShow(true),
    },
  ];

  const deviceFilteredByName =
    deviceFilter.name &&
    data?.filter((device) =>
      device.name.toLowerCase().includes(deviceFilter.name.toLowerCase())
    );

  const deviceFilteredByStatus =
    deviceFilter.status && deviceFilter.status == "all"
      ? data
      : data?.filter((device) => device.status == deviceFilter.status);

  const deviceFilteredByCenter =
    deviceFilter.center && deviceFilter.center == "all"
      ? data
      : data?.filter((device) => device.center?.id == deviceFilter.center);

  let DeviceData = deviceFilter.name
    ? deviceFilteredByName
    : deviceFilter.status
    ? deviceFilteredByStatus
    : deviceFilter.center
    ? deviceFilteredByCenter
    : data;
  const devices = DeviceData?.map((device) => {
    return {
      Device: device?.name,
      Type: device?.type,
      Center: device?.center.name,
      Status: device?.status,
      ...device,
    };
  });

  useEffect(() => {
    if (device_data.id) {
      setValue("device", device_data.name);
      setValue("type", device_data.type);
      setValue("center", device_data.center.id);
      setValue("status", device_data.status == "active" ? true : false);
    }
  }, [device_data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: joiResolver(deviceSchema) });

  const onSubmit = (data) => {
    if (is_updating) {
      updateDeviceMutation.mutate(
        {
          ...data,
          name: data.device,
          id: device_data.id,
          status: data.status == true ? "active" : "blocked",
        },
        {
          onSuccess: () => {
            toast.success("device updated.", { theme: "colored" });
            queryClient.invalidateQueries(["devices"]);
            setModalShow(false);
          },
        }
      );
    } else {
      deviceMutation.mutate(
        {
          ...data,
          name: data.device,
          status: "active",
        },
        {
          onSuccess: () => {
            toast.success("device created.", { theme: "colored" });
            queryClient.invalidateQueries(["devices"]);
            setModalShow(false);
          },
        }
      );
    }
  };

  console.log("devicefilter", deviceFilter);
  return (
    <div className="">
      <DeviceFilter
        setIs_updating={setIs_updating}
        setDeviceFilter={setDeviceFilter}
        deviceFilter={deviceFilter}
        setModalShow={setModalShow}
        centers={centers}
      />

      <div className="bg-slate-200 ">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">Devices</h3>
      </div>
      <CustomTable
        setModal_data={setDevice_data}
        columns={columns}
        data={devices}
        lists={lists}
      />

      <DeviceModal
        centers={centers}
        centerIsloading={centerIsloading}
        show={modalShow}
        device_data={device_data}
        onHide={() => setModalShow(false)}
        register={register}
        header={"Update device"}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
        is_updating={is_updating}
        deviceFields={deviceFields}
        onSubmit={onSubmit}
      />

      <AlertDialog
        isOpen={deleteModalShow}
        leastDestructiveRef={cancelRef}
        onClose={() => setdeleteModalShow(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Device
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
                  deleteDeviceMutation.mutate(device_data.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries(["devices"]);
                      toast.success("device deleted.", { theme: "colored" });
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

export default DevicePage;
