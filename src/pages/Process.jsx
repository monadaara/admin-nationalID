import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getAplicant } from "../service/appointment";
import CustomTable from "../components/common/Table";
import { BsPlus } from "react-icons/bs";
import { FaRegUser, FaRegHandPaper } from "react-icons/fa";
import PictureModel from "../models/PictureModel";
import {
  getAcknowledgement,
  removeBg,
  setIDs,
  set_fingerprint,
} from "../service/processing";
import DeviceModal from "../models/DeviceModal";
import { toast } from "react-toastify";
import AknowledgementModal from "../models/AknowledgementModel";
import Webcam from "react-webcam";
import { CallSGIFPGetData } from "./../service/biometricFun";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from "@chakra-ui/react";

const ProcessPage = () => {
  const { applicant_data, setApplicant_data } = useState();
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState({ image: "", id: "" });
  const [closeModel, setCloseModel] = useState(false);
  const [matchScore, setMatchScore] = useState("");
  const [finger_data, setFinger_data] = useState({
    template1: "",
    template2: "",
    img1: "",
    img2: "",
    quality1: "",
    quality2: "",
  });
  const [acknow_id, setAcknow_id] = useState("");
  const [acknowModel, setAcknowModel] = useState(false);
  const [index, setIndex] = useState(0);

  const applicant_id = localStorage.getItem("applicant_id");

  const { data } = useQuery({
    queryKey: ["applicant", applicant_id],
    queryFn: () => getAplicant(applicant_id),
  });
  const { data: acknowlegement, isLoading } = useQuery({
    queryKey: ["acknowlegement", acknow_id],
    queryFn: () => getAcknowledgement(acknow_id),
    enabled: !!acknow_id,
  });

  console.log("fngerdata", finger_data, index);
  const imageMutation = useMutation((data) => removeBg(data), {
    onSuccess: (data) => {
      setImage({ image: data.image, id: data.id });
    },
  });
  const fingerprintMutation = useMutation((data) => set_fingerprint(data), {
    onError: (error) => {
      toast.error("Something went wrong", { theme: "colored" });
    },
  });
  const IDsMutation = useMutation((data) => setIDs(data), {
    onSuccess: (data) => {
      fingerprintMutation.mutate({
        owner: data.id,
        finger_name: "thumb",
        fingerprint_data: finger_data.template1,
        fingerprint_img: finger_data.img1,
      });
      fingerprintMutation.mutate(
        {
          owner: data.id,
          finger_name: "thumb",
          fingerprint_data: finger_data.template2,
          fingerprint_img: finger_data.img2,
        },
        {
          onSuccess: (finger) => {
            setAcknow_id(data?.qrcode?.id);
            toast.success("Seccessfully, registered", { theme: "colored" });
            // localStorage.removeItem("applicant_id");
            // navigate("/applicants");
          },
        }
      );
    },
  });

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

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the captured image

    // Resize the captured image to national ID size
    const canvas = document.createElement("canvas");
    canvas.width = 600; // Width in pixels for the national ID size
    canvas.height = 400; // Height in pixels for the national ID size
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resizedImageSrc = canvas.toDataURL("image/jpeg");

      imageMutation.mutate(resizedImageSrc);
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    if (matchScore && matchScore > 100) {
      toast.error("Biometric allready registered", { theme: "colored" });
      localStorage.removeItem("applicant_id");
      navigate("/applicants");
    }
  }, [matchScore]);

  useEffect(() => {
    if (closeModel) {
      setTimeout(() => {
        localStorage.removeItem("applicant_id");
        navigate("/applicants");
      }, 300);
    }
  }, []);
  return (
    <div className=" ">
      <div className="bg-slate-200 h-[48px] my-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">Processing</h3>
        <div className="flex px-1">
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
            className="bg-blue-500 rounded text-white px-2 py-2"
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
          <div className="space-y-4">
            <button
              onClick={() => {
                setIndex(1);
                setImage("");
              }}
              className="w-20 h-20 border-2 border-bluelight flex items-center justify-center"
            >
              <FaRegUser className="w-20" />
            </button>
            <button
              onClick={() => setIndex(2)}
              className="w-20 h-20 border-2 border-bluelight flex items-center justify-center"
            >
              <FaRegHandPaper className="w-20" />
            </button>
            <button
              onClick={() => setIndex(3)}
              className="w-20 h-20 border-2 border-bluelight flex items-center justify-center"
            >
              <FaRegHandPaper className="w-20" />
            </button>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            {(index == 2 || index == 3) &&
            finger_data[`quality${index - 1}`] ? (
              <Box className="w-24" pt={6} pb={2}>
                <Slider aria-label="slider-ex-6" disabled>
                  <SliderMark
                    value={finger_data[`quality${index - 1}`]}
                    textAlign="center"
                    bg={
                      finger_data[`quality${index - 1}`] < 60
                        ? "red.500"
                        : "blue.500"
                    }
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="12"
                  >
                    {finger_data[`quality${index - 1}`]}%
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            ) : (
              ""
            )}
            <div className="w-48 h-48 border-2   border-bluelight ">
              {index == 1 && !image.image && (
                <Webcam
                  className="w-full h-full"
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
              )}
              {index == 1 && image.image ? (
                <img
                  className="w-full h-full"
                  src={"http://127.0.0.1:8000/" + image.image}
                  alt=""
                />
              ) : (index == 2 || index == 3) &&
                finger_data[`img${index - 1}`] ? (
                <img
                  className="w-full h-full"
                  src={finger_data[`img${index - 1}`]}
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => {
                index == 1
                  ? capture()
                  : index == 2 || index == 3
                  ? CallSGIFPGetData(index - 1, setFinger_data, setMatchScore)
                  : "";
              }}
              className="bg-slate-700 mt-3 px-5 py-2 w-28 rounded text-white"
            >
              Scan
            </button>
          </div>
        </section>
      </div>

      {acknowlegement && !isLoading && (
        <AknowledgementModal
          setCloseModel={setCloseModel}
          imageMutation={imageMutation}
          onHide={() => setAcknowModel(false)}
          show={acknowModel}
          data={acknowlegement}
        />
      )}
    </div>
  );
};

export default ProcessPage;
