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

import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);
import CustomTable from "../components/common/Table";
import { useForm } from "react-hook-form";
import { userFields, userSchema } from "../components/common/Schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { updateDevice } from "../service/device";
import {
  delete_users,
  get_users,
  set_users,
  update_users,
} from "../service/admin";
import UserModal from "../models/UserModel";
import UsersFilter from "../components/UsersFilter";

const createUserSchema = userSchema.keys({
  password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required(),
});

const UsersPage = () => {
  const cancelRef = React.useRef();
  const queryClient = useQueryClient();
  const [modalShow, setModalShow] = React.useState(false);
  const [is_updating, setIs_updating] = React.useState(false);
  const [usersFilter, setUsersFilter] = React.useState({
    status: "all",
    name: "",
    center: "all",
  });
  const [deleteModalShow, setdeleteModalShow] = React.useState(false);
  const [users_data, setUsers_data] = React.useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: get_users,
  });

  const { data: centers, isLoading: centerIsloading } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const usersMutation = useMutation((data) => set_users(data));
  const updateUsersMutation = useMutation((data) => update_users(data));
  const deleteUsersMutation = useMutation((data) => delete_users(data));

  const columns = ["Name", "Email", "Username", "Type", "Center"];
  const lists = [
    {
      title: "Update User",
      onclick: () => {
        setIs_updating(true);
        setModalShow(true);
      },
    },
    {
      title: "Delete User",
      onclick: () => setdeleteModalShow(true),
    },
  ];

  const usersFilteredByName =
    usersFilter.name &&
    data?.filter((device) =>
      device.first_name.toLowerCase().includes(usersFilter.name.toLowerCase())
    );

  const usersFilteredByStatus =
    usersFilter.status && usersFilter.status == "all"
      ? data
      : data?.filter((device) => device.status == usersFilter.status);

  const usersFilteredByCenter =
    usersFilter.center && usersFilter.center == "all"
      ? data
      : data?.filter((device) => device.center?.id == usersFilter.center);

  let usersData = usersFilter.name
    ? usersFilteredByName
    : usersFilter.status
    ? usersFilteredByStatus
    : usersFilter.center
    ? usersFilteredByCenter
    : data;

  const users = usersData?.map((user) => {
    return {
      Name: user?.first_name + " " + user?.middle_name + " " + user.last_name,
      Username: user?.username,
      Email: user?.email,
      Center: user?.center?.name || "None",
      Type: user?.is_staff == true ? "Admin" : "User",
      ...user,
    };
  });

  // console.log("userdetail", users);
  useEffect(() => {
    if (is_updating) {
      setValue("first_name", users_data.first_name);
      setValue("middle_name", users_data.middle_name);
      setValue("last_name", users_data.last_name);
      setValue("username", users_data.username);
      setValue("email", users_data.email);
      setValue("center", users_data?.center?.id || "");
      setValue("is_staff", users_data.is_staff);
    } else {
      reset();
    }
  }, [users_data, is_updating]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: joiResolver(is_updating ? userSchema : createUserSchema),
  });

  console.log("heeeeeeeeeere", is_updating);
  const onSubmit = (data) => {
    if (is_updating) {
      updateUsersMutation.mutate(
        {
          ...data,
          id: users_data.id,
        },
        {
          onSuccess: () => {
            toast.success("user updated.", { theme: "colored" });
            queryClient.invalidateQueries(["users"]);
            setModalShow(false);
          },
        }
      );
    } else {
      usersMutation.mutate(
        {
          ...data,
        },
        {
          onSuccess: () => {
            toast.success("user created.", { theme: "colored" });
            queryClient.invalidateQueries(["users"]);
            setModalShow(false);
          },
        }
      );
    }
  };

  // console.log("usersfilter", centers);
  return (
    <div className="">
      <UsersFilter
        setIs_updating={setIs_updating}
        setUsersFilter={setUsersFilter}
        usersFilter={usersFilter}
        setModalShow={setModalShow}
        centers={centers}
      />

      <div className="bg-slate-200 ">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">Users</h3>
      </div>
      <CustomTable
        setModal_data={setUsers_data}
        columns={columns}
        data={users}
        lists={lists}
      />

      <UserModal
        centers={centers}
        centerIsloading={centerIsloading}
        show={modalShow}
        users_data={users_data}
        onHide={() => setModalShow(false)}
        register={register}
        header={"Update device"}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
        is_updating={is_updating}
        userFields={userFields}
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
              Delete User
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
                  console.log("users_data", users_data);
                  deleteUsersMutation.mutate(users_data.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries(["users"]);
                      toast.success("user deleted.", { theme: "colored" });
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

export default UsersPage;
