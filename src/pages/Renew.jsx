import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  get_fingerprint_data,
  get_nationalIDByFingerprint,
} from "../service/processing";
import { CgSpinner } from "react-icons/cg";
import { CallSGIFPGetData } from "../service/biometricFun";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const RenewID = () => {
  const [fingerprint, setFingerprint] = useState({});
  const [isLaoding, setIsLaoding] = useState(false);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["fingerprints"],
    queryFn: get_fingerprint_data,
  });
  const { data: nationalID } = useQuery({
    queryKey: ["nationalID", fingerprint?.id],
    queryFn: () => get_nationalIDByFingerprint(fingerprint?.id),
    enabled: !!fingerprint?.id,
  });

  const handleCapture = () => {
    setIsLaoding(true);
    CallSGIFPGetData(0, setFingerprint, data, true);
    setIsLaoding(false);
  };

  useEffect(() => {
    if (nationalID?.results[0]?.id) {
      localStorage.setItem("applicant_id", nationalID.results[0]?.applicant.id);
      localStorage.setItem("is_lost", true);
      localStorage.setItem("is_new", true);
      navigate("/processing");
    }
  }, [nationalID]);

  useEffect(() => {
    if (fingerprint.id == "is_none") {
      toast.error("No biometric found");
      navigate(-1);
    }
  }, [fingerprint]);
  return (
    <div className="mt-10">
      <p className="text-lg font-medium text-center mb-5">
        Capture fingerprint
      </p>
      <div className="flex justify-center items-center">
        <div className="w-48 h-48 border-2   border-bluelight ">
          <img
            className="w-full h-full object-cover"
            src={fingerprint.fingerprint_img}
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        <button
          onClick={handleCapture}
          className=" bg-blue-400 py-2 px-6 flex items-center gap-x-2 justify-center rounded-lg"
        >
          <span className={`animate-spin ${isLaoding ? "visible" : "hidden"}`}>
            <CgSpinner />
          </span>
          Scan
        </button>
      </div>
    </div>
  );
};

export default RenewID;
