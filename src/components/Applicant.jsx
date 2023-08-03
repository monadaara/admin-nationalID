import React, { useEffect } from "react";
import { applicantFields, applicantSchema } from "./common/Schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import CustomForm from "./common/Form";
import { useMutation } from "react-query";
import {
  setDocument,
  updateAddress,
  updateAplicant,
} from "../service/appointment";
import { toast } from "react-toastify";
import { theme } from "@chakra-ui/react";
import moment from "moment";

const Applicant = ({ data, hasDocument, setHasDocument, setShowEdit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ resolver: joiResolver(applicantSchema) });

  useEffect(() => {
    setValue("first_name", data.first_name);
    setValue("middle_name", data.middle_name);
    setValue("last_name", data.last_name);
    setValue("mother_first_name", data.mother_first_name);
    setValue("mother_middle_name", data.mother_middle_name);
    setValue("mother_last_name", data.mother_last_name);
    setValue("date_of_birth", data.date_of_birth);
    setValue("sex", data.sex);
    setValue("marital_status", data.marital_status);
    setValue("birth_country", data.birth_country);
    setValue("birth_region", data.birth_region);
    setValue("birth_city", data.birth_city);
    setValue("blood_type", data.blood_type);
    setValue("residence", data.residence);
    setValue("email", data.address.email);
    setValue("phone", data.address.phone);
    setValue("country", data.address.country);
    setValue("region", data.address.region);
    setValue("city", data.address.city);
  }, []);
  applicantFields[6].defaultValue = applicantFields[6].options.find(
    (option) => option.value === data.sex
  );
  applicantFields[8].defaultValue = applicantFields[8].options.find(
    (option) => option.value === data.marital_status
  );
  applicantFields[9].defaultValue = applicantFields[9].options.find(
    (option) => option.value === data.blood_type
  );
  applicantFields[10].defaultValue = applicantFields[10].options.find(
    (option) => option.value === data.birth_country
  );
  applicantFields[11].defaultValue = applicantFields[11].options.find(
    (option) => option.value === data.birth_region
  );
  applicantFields[12].defaultValue = applicantFields[12].options.find(
    (option) => option.value === data.birth_city
  );
  applicantFields[13].defaultValue = applicantFields[13].options.find(
    (option) => option.value === data.address.country
  );
  applicantFields[14].defaultValue = applicantFields[14].options.find(
    (option) => option.value === data.address.region
  );
  applicantFields[15].defaultValue = applicantFields[15].options.find(
    (option) => option.value === data.address.city
  );
  applicantFields[16].defaultValue = applicantFields[16].options.find(
    (option) => option.value === data.residence
  );

  const applicantMutation = useMutation((data) => updateAplicant(data));
  const documentMutation = useMutation((data) => setDocument(data));
  const addressMutation = useMutation((data) => updateAddress(data));
  const onSubmit = (submitted_data) => {
    if (!hasDocument)
      return toast.error("upload document", { theme: "colored" });

    addressMutation.mutate({
      id: data.address.id,
      country: submitted_data.country,
      region: submitted_data.region,
      city: submitted_data.city,
      email: submitted_data.email,
      phone: submitted_data.phone,
    });
    applicantMutation.mutate(
      {
        applicant_id: data.id,
        address: data.address.id,
        ...submitted_data,
        date_of_birth: moment(submitted_data.date_of_birth).format(
          "YYYY-MM-DD"
        ),
      },
      {
        onSuccess: (data) => {
          if (!hasDocument) {
            const formData = new FormData();
            formData.append("file", submitted_data.file[0]);
            formData.append("applicant", data.id);
            documentMutation.mutate(formData, {
              onSuccess: (data) => {},
            });
          }

          toast.success("applicant data is updated.", { theme: "colored" });
          setShowEdit(false);
        },
      }
    );
  };

  console.log("has", hasDocument);
  return (
    <form
      action=""
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className=" my-6"
    >
      <div className="grid grid-cols-2 gap-x-10">
        <CustomForm
          fields={applicantFields}
          register={register}
          errors={errors}
          setValue={setValue}
          //   data={device_data}
        />

        {!hasDocument ? (
          <div className="mb-3">
            <label className="block mb-1">Upload document </label>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                setValue("file", e.target.files);
                setHasDocument(true);
              }}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center">
          <button className="bg-bluelight px-3 py-2 text-white w-full mt-3 rounded-lg">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Applicant;
