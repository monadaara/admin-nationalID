import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getAplicant } from "../service/appointment";
import CustomTable from "../components/common/Table";
import { BsPlus } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import PictureModel from "../models/PictureModel";
import { getAcknowledgement, removeBg, setIDs } from "../service/processing";
import DeviceModal from "../models/DeviceModal";
import { toast } from "react-toastify";
import AknowledgementModal from "../models/AknowledgementModel";

const ProcessPage = () => {
  const { applicant_data, setApplicant_data } = useState();
  const [modalShow, setModalShow] = useState(false);
  const [image, setImage] = useState({ image: "", id: "" });
  const [acknow_id, setAcknow_id] = useState("");
  const [acknowModel, setAcknowModel] = useState(false);

  const applicant_id = localStorage.getItem("applicant_id");

  const { data } = useQuery({
    queryKey: ["applicant", applicant_id],
    queryFn: () => getAplicant(applicant_id),
  });
  const { data: acknowlegement, isLoading } = useQuery({
    queryKey: ["acknowlegement", applicant_id],
    queryFn: () => getAcknowledgement(acknow_id),
    enabled: !!acknow_id,
  });

  const imageMutation = useMutation((data) => removeBg(data), {
    onSuccess: (data) => {
      setImage({ image: data.image, id: data.id });
      setModalShow(false);
    },
  });
  const IDsMutation = useMutation((data) => setIDs(data), {
    onSuccess: (data) => {
      setAcknow_id(data?.qrcode?.id);
      toast.success("Seccessfully, registered", { theme: "colored" });
    },
    onError: (error) => {
      toast.error("Something went wrong", { theme: "colored" });
    },
  });

  console.log("acknowlegement", acknowlegement);

  const columns = [
    "Full_name",
    "Age",
    "Birth_city",
    "Birth_country",
    "Birth_region",
    "Blood_type",
    "Date_of_birth",
    "Marital_status",
    "Residence",
    "Sex",
    "Permanent_country",
    "Permanent_region",
    "Permanent_city",
    "Email",
    "Phone",
  ];

  const lists = {
    title: "Edit",
    icon: <BsPlus />,
  };

  const applicants = [
    {
      Full_name: `${data?.first_name} ${data?.middle_name} ${data?.last_name}`,
      Age: data?.age,
      Birth_city: data?.birth_city,
      Birth_country: data?.birth_country,
      Birth_region: data?.birth_region,
      Blood_type: data?.blood_type,
      Permanent_country: data?.address?.country,
      Permanent_region: data?.address?.region,
      Permanent_city: data?.address?.city,
      Email: data?.address?.email,
      Phone: data?.address?.phone,
      Date_of_birth: data?.date_of_birth,
      Marital_status: data?.marital_status,
      Residence: data?.residence,
      Sex: data?.sex,
      ...data,
    },
  ];

  useEffect(() => {
    if (acknowlegement) {
      setAcknowModel(true);
    }
  }, [acknowlegement]);

  return (
    <div className=" ">
      <div className="bg-slate-200 h-[48px] my-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">Processing</h3>
        <div className="flex px-10">
          <button
            disabled={!image.id}
            onClick={() => {
              IDsMutation.mutate({
                ...data,
                address: data.address.id,
                image: image.id,
                status: "Pending",
              });
            }}
            className="bg-blue-500 rounded text white px-2 py-2"
          >
            Save data
          </button>
        </div>
      </div>

      <CustomTable
        setModal_data={setApplicant_data}
        columns={columns}
        data={applicants}
        lists={lists}
      />

      <div className="mt-10">
        <h1 className="font-medium text-2xl border-b border-slate-400">
          Biometrics
        </h1>

        <section className=" mt-10 flex items-center  gap-10">
          <div className="">
            <button
              onClick={() => setModalShow(true)}
              className="w-20 h-20 border-2 border-bluelight flex items-center justify-center"
            >
              <FaRegUser className="w-20" />
            </button>
          </div>
          {image.image && (
            <div className="w-32 h-24 border-2 border-bluelight ">
              <img
                className="w-full h-full"
                src={"http://127.0.0.1:8000/" + image.image}
                alt=""
              />
            </div>
          )}
        </section>
      </div>

      {/* <DeviceModal
        centers={centers}
        show={modalShow}
        onHide={() => setModalShow(false)}
        register={register}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
        is_updating={is_updating}
        deviceFields={deviceFields}
        onSubmit={onSubmit}
      /> */}

      {acknowlegement && !isLoading && (
        <AknowledgementModal
          imageMutation={imageMutation}
          onHide={() => setAcknowModel(false)}
          show={acknowModel}
          data={acknowlegement}
        />
      )}
      <PictureModel
        imageMutation={imageMutation}
        onHide={() => setModalShow(false)}
        show={modalShow}
      />
    </div>
  );
};

export default ProcessPage;
