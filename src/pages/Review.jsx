import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAplicant, updateAplicant } from "../service/appointment";
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
import { setIDs } from "../service/processing";
import { toast } from "react-toastify";

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteModalShow, setdeleteModalShow] = useState(false);

  const { data } = useQuery({
    queryKey: ["applicant_single", id],
    queryFn: () => getAplicant(id),
  });

  const { data: suspected } = useQuery({
    queryKey: ["suspected_application", data?.suspected_id],
    queryFn: () => getAplicant(data?.suspected_id),
    enabled: !!data?.suspected_id,
  });
  const cancelRef = React.useRef();
  const is_suspected = localStorage.getItem("is_suspected");

  const applicantMutation = useMutation((data) => updateAplicant(data));
  const iDSMutation = useMutation((data) => setIDs(data));

  return (
    <div className="my-10">
      <div>
        <h1 className="font-medium text-lg text-center">
          Applicant Information checkup
        </h1>

        <div className={` ${is_suspected ? "grid grid-cols-2 gap-x-5" : ""}`}>
          <div>
            <div className="mt-8">
              <h1 className="border-b border-slate-700 w-full ">
                {is_suspected ? "Suspected" : ""} personal information
              </h1>
              <div className="mt-5  flex justify-between items-start ">
                <div className="space-y-2">
                  <p>
                    <strong>Full Name: </strong>
                    {data?.first_name +
                      " " +
                      data?.middle_name +
                      " " +
                      data?.last_name}
                  </p>
                  <p>
                    <strong>Age: </strong>
                    {data?.age}
                  </p>
                  <p>
                    <strong>Sex: </strong>
                    {data?.sex == "m" ? "Male" : "Female"}
                  </p>
                  <p>
                    <strong>Marital Status: </strong>
                    {data?.marital_status}
                  </p>
                  <p>
                    <strong>Blood Type: </strong>
                    {data?.blood_type}
                  </p>
                  <p>
                    <strong>Birth Date: </strong>
                    {data?.date_of_birth}
                  </p>
                  <p>
                    <strong>Birth Country: </strong>
                    {data?.birth_country}
                  </p>
                  <p>
                    <strong>Birth Region: </strong>
                    {data?.birth_region}
                  </p>
                  <p>
                    <strong>Birth City: </strong>
                    {data?.birth_city}
                  </p>
                  <p>
                    <strong>Residence: </strong>
                    {data?.residence}
                  </p>
                  <p>
                    <strong>Phone: </strong>
                    {data?.address.phone}
                  </p>
                  {data?.address?.email ? (
                    <p>
                      <strong>Email: </strong>
                      {data?.address.email}
                    </p>
                  ) : (
                    ""
                  )}

                  <p>
                    <strong>Support Document: </strong>

                    <button
                      className="bg-slate-400 rounded-lg px-3 text-white py-2"
                      onClick={() => {
                        window.open(data?.document.file, "_blank");
                      }}
                    >
                      Open Document
                    </button>
                  </p>
                </div>
                <div>
                  <img src={data?.image?.image} alt="" />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="border-b border-slate-700 w-1/2">
                Family information
              </h1>
              <div className="mt-5 space-y-2 flex justify-between items-start mr-20">
                <p>
                  <strong>Mother's Name: </strong>
                  {data?.mother_first_name +
                    " " +
                    data?.mother_middle_name +
                    " " +
                    data?.mother_last_name}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="border-b border-slate-700 w-1/2">
                Boimetric information
              </h1>
              <div className="mt-5 space-y-2 flex justify-between items-start mr-36">
                <p>
                  <strong>Thumbs fingerprint: </strong>
                  <div className="flex justify-between gap-x-16 items-center w-48">
                    {data?.fingerprint_template?.map((finger) => (
                      <img src={finger.fingerprint_img} alt="" />
                    ))}
                  </div>
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="border-b border-slate-700 w-1/2">
                Permenent Address information
              </h1>
              <div className="mt-5 space-y-2">
                <p>
                  <strong>Country: </strong>
                  {data?.address.country}
                </p>
                <p>
                  <strong>Region: </strong>
                  {data?.address.region}
                </p>
                <p>
                  <strong>City: </strong>
                  {data?.address.city}
                </p>
              </div>
            </div>
          </div>
          {is_suspected ? (
            <div>
              <div className="mt-8">
                <h1 className="border-b border-slate-700 ">
                  {is_suspected ? "To suspected " : ""}personal information
                </h1>
                <div className="mt-5  flex justify-between items-start">
                  <div className="space-y-2">
                    <p>
                      <strong>Full Name: </strong>
                      {suspected?.first_name +
                        " " +
                        suspected?.middle_name +
                        " " +
                        suspected?.last_name}
                    </p>
                    <p>
                      <strong>Age: </strong>
                      {suspected?.age}
                    </p>
                    <p>
                      <strong>Sex: </strong>
                      {suspected?.sex == "m" ? "Male" : "Female"}
                    </p>
                    <p>
                      <strong>Marital Status: </strong>
                      {suspected?.marital_status}
                    </p>
                    <p>
                      <strong>Blood Type: </strong>
                      {suspected?.blood_type}
                    </p>
                    <p>
                      <strong>Birth Date: </strong>
                      {suspected?.date_of_birth}
                    </p>
                    <p>
                      <strong>Birth Country: </strong>
                      {suspected?.birth_country}
                    </p>
                    <p>
                      <strong>Birth Region: </strong>
                      {suspected?.birth_region}
                    </p>
                    <p>
                      <strong>Birth City: </strong>
                      {suspected?.birth_city}
                    </p>
                    <p>
                      <strong>Residence: </strong>
                      {suspected?.residence}
                    </p>
                    <p>
                      <strong>Phone: </strong>
                      {suspected?.address.phone}
                    </p>
                    {suspected?.address?.email ? (
                      <p>
                        <strong>Email: </strong>
                        {suspected?.address.email}
                      </p>
                    ) : (
                      ""
                    )}

                    <p>
                      <strong>Support Document: </strong>

                      <button
                        className="bg-slate-400 rounded-lg px-3 text-white py-2"
                        onClick={() => {
                          window.open(suspected?.document.file, "_blank");
                        }}
                      >
                        Open Document
                      </button>
                    </p>
                  </div>
                  <div>
                    <img src={suspected?.image?.image} alt="" />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h1 className="border-b border-slate-700 w-1/2">
                  Family information
                </h1>
                <div className="mt-5 space-y-2 flex justify-between items-start mr-36">
                  <p>
                    <strong>Mother's Name: </strong>
                    {suspected?.mother_first_name +
                      " " +
                      suspected?.mother_middle_name +
                      " " +
                      suspected?.mother_last_name}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h1 className="border-b border-slate-700 w-1/2">
                  Boimetric information
                </h1>
                <div className="mt-5 space-y-2 flex justify-between items-start mr-36">
                  <p>
                    <strong>Thumbs fingerprint: </strong>
                    <div className="flex justify-between gap-x-16 items-center w-48">
                      {suspected?.fingerprint_template?.map((finger) => (
                        <img src={finger.fingerprint_img} alt="" />
                      ))}
                    </div>
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h1 className="border-b border-slate-700 w-1/2">
                  Permenent Address information
                </h1>
                <div className="mt-5 space-y-2">
                  <p>
                    <strong>Country: </strong>
                    {suspected?.address.country}
                  </p>
                  <p>
                    <strong>Region: </strong>
                    {suspected?.address.region}
                  </p>
                  <p>
                    <strong>City: </strong>
                    {suspected?.address.city}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-16">
          <button
            onClick={() => {
              setdeleteModalShow(true);
            }}
            className="bg-red-400 px-3 py-3 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              iDSMutation.mutate(
                {
                  applicant: data?.id,
                  suspected: is_suspected ? true : false,
                },
                {
                  onSuccess: (data) => {
                    toast.success("ID card approved.", { theme: "colored" });
                    navigate(-1);
                  },
                }
              );
            }}
            className="bg-blue-400 px-3 py-3 rounded-lg"
          >
            Approve
          </button>
        </div>
      </div>

      <AlertDialog
        isOpen={deleteModalShow}
        leastDestructiveRef={cancelRef}
        onClose={() => setdeleteModalShow(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancle Application
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
                  applicantMutation.mutate(
                    {
                      applicant_id: data?.id,
                      status: "Cancelled",
                      suspected: is_suspected ? true : false,
                      admin: true,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Applications deleted.", {
                          theme: "colored",
                        });
                        setdeleteModalShow(false);
                        navigate(-1);
                      },
                    }
                  );
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

export default Review;
