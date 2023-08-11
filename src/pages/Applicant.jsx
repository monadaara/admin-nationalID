import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { getCenters } from "./../service/centers";

import CustomTable from "../components/common/Table";

import { setDevice, updateDevice } from "../service/device";

import { BsPlus } from "react-icons/bs";
import { getAppointments } from "../service/appointment";
import moment from "moment/moment";
import ApplicationFilter from "./../components/ApplicationFilter";
import { useNavigate } from "react-router-dom";

const ApplicantPage = () => {
  const navigate = useNavigate();
  const [filterByDate, setfilterByDate] = React.useState("");
  const [page, setPage] = React.useState(1);

  const [appointmentFilter, setAppointmentFilter] = React.useState({
    status: "all",
    name: "",
    center: "all",
  });
  const [deleteModalShow, setdeleteModalShow] = React.useState(false);
  const [appointment, setAppointment] = React.useState({});

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      ["appointments", page, filterByDate],
      () => getAppointments(page, filterByDate),
      {
        keepPreviousData: true,
      }
    );

  const { data: centers, isLoading: centerIsloading } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  const columns = ["Name", "Center", "Date", "Time"];
  const lists = {
    title: "Process",
    icon: <BsPlus />,
  };

  const appointmentFilteredByName =
    appointmentFilter.name &&
    data?.results?.filter((appointment) =>
      appointment.applicant.first_name
        .toLowerCase()
        .includes(appointmentFilter.name.toLowerCase())
    );

  const appointmentFilteredByCenter =
    appointmentFilter.center && appointmentFilter.center == "all"
      ? data?.results
      : data?.results?.filter(
          (device) => device.center?.id == appointmentFilter.center
        );

  let applicantData = appointmentFilter.name
    ? appointmentFilteredByName
    : appointmentFilter.center
    ? appointmentFilteredByCenter
    : data?.results;
  const applicants = applicantData?.map((appoitment) => {
    return {
      Name: `${appoitment.applicant.first_name} ${appoitment.applicant.middle_name} ${appoitment.applicant.last_name}`,
      Center: appoitment?.center.name,
      Date: appoitment?.date,
      Time: moment(appoitment?.from_time, "HH:mm:ss").format("h:mm A"),
      ...appoitment,
    };
  });

  useEffect(() => {
    if (appointment?.applicant?.id) {
      localStorage.setItem("applicant_id", appointment?.applicant?.id);
      navigate("/processing");
    }
  }, [appointment]);

  
  return (
    <div className="">
      <ApplicationFilter
        setAppointmentFilter={setAppointmentFilter}
        appointmentFilter={appointmentFilter}
        centers={centers}
        filterByDate={filterByDate}
        setfilterByDate={setfilterByDate}
      />

      <div className="bg-slate-200 h-[48px] mb-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">Applicants</h3>
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
            // Disable the Next Page button until we know a next page is available
            disabled={isPreviousData || !data?.next}
            className="bg-slate-500 rounded px-2 py-2"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      <CustomTable
        setModal_data={setAppointment}
        columns={columns}
        data={applicants}
        lists={lists}
      />
    </div>
  );
};

export default ApplicantPage;
