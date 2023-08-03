import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import CustomTable from "../components/common/Table";

import { useNavigate } from "react-router-dom";
import { get_centers_by_user } from "../service/reports";

const CenterReportPage = () => {
  const navigate = useNavigate();

  const { data } = useQuery(["center_by_user_report"], () =>
    get_centers_by_user()
  );

  const columns = ["Name", "Phone", "Manager", "Users", "Status"];

  const centers = data?.map((center) => {
    console.log("center", center);
    return {
      Name: center?.center_name,
      Phone: center?.phone,
      Manager: center?.manager_first_name + " " + center?.manager_middle_name,
      Users: center?.user_count,
      Status: center?.status,
      ...center,
    };
  });

  return (
    <div className="">
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

export default CenterReportPage;
