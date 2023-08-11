import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import CustomTable from "../components/common/Table";

import { useNavigate } from "react-router-dom";
import { get_centers_by_Appointments } from "../service/reports";
import CenterByAppointmentsFilter from "../components/CenterByAppointmentFilter";
import moment from "moment";

const CenterAppointmentReportPage = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState({
    start_date: "",
    end_date: "",
  });
  const { data } = useQuery(
    ["get_centers_by_Appointments", dateFilter.start_date, dateFilter.end_date],
    () =>
      get_centers_by_Appointments(dateFilter.start_date, dateFilter.end_date)
  );

  const columns = [
    "Name",
    "TotalAppointments",
    "Booked",
    "Expired",
    "cancelled",
  ];

  const centers = data?.map((center) => {
    console.log("center", center);
    return {
      Name: center?.name,
      TotalAppointments: center?.total,
      Booked: center?.booked,
      Expired: center?.expired,
      cancelled: center?.cancelled,
      ...center,
    };
  });

  useEffect(() => {
    setDateFilter({
      start_date: moment().format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
    });
  }, []);
  return (
    <div className="">
      <CenterByAppointmentsFilter
        filterByDate={dateFilter}
        setfilterByDate={setDateFilter}
      />
      <div className="bg-slate-200 h-[48px] my-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">
          Center By users Report
        </h3>
        {/* <div className="flex px-10">
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
        </div> */}
      </div>
      <CustomTable setModal_data={""} columns={columns} data={centers} />
    </div>
  );
};

export default CenterAppointmentReportPage;
