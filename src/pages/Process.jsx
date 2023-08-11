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
  get_fingerprint_data,
  removeBg,
  setIDs,
  set_fingerprint,
  updateApplicantImg,
  update_fingerprint,
} from "../service/processing";
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
import Applicant from "../components/Applicant";

const ProcessPage = () => {
  const [applicant_data, setApplicant_data] = useState();
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState({ image: "" });
  const [closeModel, setCloseModel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [hasDocument, setHasDocument] = useState(true);
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
  const is_lost = localStorage.getItem("is_lost");

  const { data, isLoading: dataIsLoading } = useQuery({
    queryKey: ["applicant", applicant_id, showEdit],
    queryFn: () => getAplicant(applicant_id),
  });
  const { data: acknowlegement, isLoading } = useQuery({
    queryKey: ["acknowlegement", acknow_id],
    queryFn: () => getAcknowledgement(acknow_id),
    enabled: !!acknow_id,
  });

  
  const imageMutation = useMutation((data) => removeBg(data));
  const updateImageMutation = useMutation((data) => updateApplicantImg(data));
  const fingerprintMutation = useMutation((data) => set_fingerprint(data), {
    onError: (error) => {
      toast.error("Something went wrong", { theme: "colored" });
    },
  });
  const updateFingerprintMutation = useMutation(
    (data) => update_fingerprint(data),
    {
      onError: (error) => {
        toast.error("Something went wrong", { theme: "colored" });
      },
    }
  );

  const columns = [
    "Full_name",
    "Mother",
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
    onclick: () => setShowEdit(true),
    icon: <BsPlus />,
  };
  let viewDocument = "";

  const applicants = [
    {
      Full_name: `${data?.first_name} ${data?.middle_name} ${data?.last_name}`,
      Age: data?.age,
      Mother: `${data?.mother_first_name} ${data?.mother_middle_name} ${data?.mother_last_name}`,
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

    setImage({ image: imageSrc });
    // console.log("image", imageSrc);
  };

  // useEffect(() => {
  //   if (matchScore && matchScore > 100) {
  //     toast.error("Biometric already registered", { theme: "colored" });
  //     localStorage.removeItem("applicant_id");
  //     localStorage.removeItem("is_lost");
  //     navigate("/applicants");
  //   }
  // }, [matchScore]);


  // console.log("matchScore",matchScore)

  useEffect(() => {
    if (closeModel) {
      setTimeout(() => {
        localStorage.removeItem("applicant_id");
        localStorage.removeItem("is_lost");
        navigate("/applicants");
      }, 300);
    }

    data?.document ? setHasDocument(true) : setHasDocument(false);
  }, [dataIsLoading]);

  data?.document
    ? (viewDocument = {
        title: "view Doc",
        onclick: (newPageUrl) => window.open(newPageUrl, "_blank"),
        icon: <BsPlus />,
      })
    : "";

  return (
    <div className=" ">
      <div className="bg-slate-200 h-[48px] my-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">Processing</h3>
        <div className="flex px-1">
          <button
            disabled={
              !hasDocument ||
              !image.image ||
              !finger_data.img1 ||
              !finger_data.img2
            }
            onClick={() => {
              if (!is_lost) {
                imageMutation.mutate({
                  image: image.image,
                  id: data.id,
                });
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
                      setAcknow_id(data.id);
                      toast.success("biometric registered.", {
                        theme: "colored",
                      });
                    },
                  }
                );
              } else {
                updateImageMutation.mutate({
                  image: image.image,
                  id: data.image.id,
                  applicant_id: data.id,
                });
                updateFingerprintMutation.mutate({
                  owner: data.id,
                  id: data.fingerprint_template[0].id,
                  finger_name: "thumb",
                  fingerprint_data: finger_data.template1,
                  fingerprint_img: finger_data.img1,
                });
                updateFingerprintMutation.mutate(
                  {
                    owner: data.id,
                    id: data.fingerprint_template[1].id,
                    finger_name: "thumb",
                    fingerprint_data: finger_data.template2,
                    fingerprint_img: finger_data.img2,
                  },
                  {
                    onSuccess: (finger) => {
                      setAcknow_id(data.id);
                      toast.success("biometric registered.", {
                        theme: "colored",
                      });
                    },
                  }
                );
              }
            }}
            className="bg-blue-500 rounded text-white px-2 py-2"
          >
            Save data
          </button>
        </div>
      </div>

      {!showEdit ? (
        <CustomTable
          setModal_data={setApplicant_data}
          columns={columns}
          data={applicants}
          lists={lists}
          viewDocument={viewDocument}
        />
      ) : (
        ""
      )}

      {showEdit && !dataIsLoading ? (
        <Applicant
          data={data}
          hasDocument={hasDocument}
          setHasDocument={setHasDocument}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
        />
      ) : (
        ""
      )}

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
                  mirrored={true} // If you want to mirror the webcam feed
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  screenshotFormat="image/jpeg"
                />
              )}
              {index == 1 && image.image ? (
                <img
                  className="w-full h-full object-cover"
                  src={image.image}
                  alt=""
                />
              ) : (index == 2 || index == 3) &&
                finger_data[`img${index - 1}`] ? (
                <img
                  className="w-full h-full "
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
                  : is_lost
                  ? CallSGIFPGetData(
                      index - 1,
                      setFinger_data,
                      "",
                      false,
                      true
                    )
                  : index == 2 || index == 3
                  ? CallSGIFPGetData(
                      index - 1,
                      setFinger_data,
                      ""
                    )
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
          onHide={() => {
            setAcknowModel(false);
            localStorage.removeItem("applicant_id");
            localStorage.removeItem("is_lost");
            navigate("/applicants");
          }}
          show={acknowModel}
          data={acknowlegement[0]}
        />
      )}
    </div>
  );
};

export default ProcessPage;
