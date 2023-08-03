import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import CustomTable from "../components/common/Table";

import { setDevice, updateDevice } from "../service/device";

import { BsPlus } from "react-icons/bs";
import moment from "moment/moment";
import ApplicationFilter from "./../components/ApplicationFilter";
import { useNavigate } from "react-router-dom";
import { get_nationalID, update_nationalId } from "../service/processing";
import IDsFilter from "../components/IDsFilter";
import IDModal from "../models/IDModel";
import { BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import { getAppointments } from "../service/appointment";
const UnapprovedPage = () => {
  const navigate = useNavigate();
  const [filters, setfilters] = React.useState({
    code: "",
    name: "",
  });
  const [page, setPage] = React.useState(1);

  const [ModalShow, setModalShow] = React.useState(false);
  const [idsData, setidsData] = React.useState({});

  const queryClient = useQueryClient();
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ["appointments", page, filters.code, filters.name],
      () => getAppointments(page, "", filters.code, filters.name, 2),
      {
        keepPreviousData: true,
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
    "Transaction_code",
  ];

  const lists = {
    icon: <BiShow />,
    title: "View",
    onclick: (row) => {
      navigate(`${row.applicant.id}`);
    },
  };

  const applicants = data?.results?.map((data) => {
    return {
      Full_name: `${data?.applicant?.first_name} ${data?.applicant?.middle_name} ${data?.applicant?.last_name}`,

      Age: data?.applicant?.age,
      Mother: `${data?.applicant?.mother_first_name} ${data?.applicant?.mother_middle_name} ${data?.applicant?.mother_last_name}`,
      Birth_city: data?.applicant?.birth_city,
      Birth_country: data?.applicant?.birth_country,
      Birth_region: data?.applicant?.birth_region,
      Transaction_code: data?.applicant?.transaction_code,
      Blood_type: data?.applicant?.blood_type,
      Permanent_country: data?.applicant?.address?.country,
      Permanent_region: data?.applicant?.address?.region,
      Permanent_city: data?.applicant?.address?.city,
      Email: data?.applicant?.address?.email,
      Phone: data?.applicant?.address?.phone,
      Date_of_birth: data?.applicant?.date_of_birth,
      Marital_status: data?.applicant?.marital_status,
      Residence: data?.applicant?.residence,
      Sex: data?.applicant?.sex,

      ...data,
    };
  });

  useEffect(() => {}, [idsData]);

  return (
    <div className="">
      <IDsFilter filters={filters} setfilters={setfilters} />

      <div className="bg-slate-200 h-[48px] mb-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">
          Unapproved ID cards
        </h3>
        <div className="flex px-10">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
            className="bg-slate-500 rounded px-2 py-2"
          >
            <FiChevronLeft />
          </button>
          <span className="font-medium text-lg px-4 ">1</span>
          <button
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data?.next}
            className="bg-slate-500 rounded px-2 py-2"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      <CustomTable
        setModal_data={setidsData}
        columns={columns}
        data={applicants}
        lists={lists}
      />

      {/* <IDModal
        idsMutation={idsMutation}
        show={ModalShow}
        onHide={() => setModalShow(false)}
        ids={idsData}
      /> */}
    </div>
  );
};

export default UnapprovedPage;
