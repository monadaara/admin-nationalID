import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import CustomTable from "../components/common/Table";

import { useNavigate } from "react-router-dom";
import { get_fingerprint_data } from "../service/processing";
import IDsFilter from "../components/IDsFilter";
import { BiShow } from "react-icons/bi";
import { getAppointments, updateAplicant } from "../service/appointment";
import { matchingfinger_templates } from "../service/biometricFun";
import moment from "moment/moment";
const UnapprovedPage = () => {
  const navigate = useNavigate();
  const [filters, setfilters] = useState({
    code: "",
    name: "",
  });
  const [page, setPage] = useState(1);

  const [idsData, setidsData] = useState({});
  const [matchingTemplates, setMatchingTemplates] = useState({
    normal: [],
    abnormal: [],
  });

  const { data, isPreviousData } = useQuery(
    ["appointments", page, filters.code, filters.name],
    () => getAppointments(page, "", filters.code, filters.name, 2),
    {
      keepPreviousData: true,
    }
  );

  const { data: fingerprint_data, isLoading } = useQuery({
    queryKey: ["fingerprints"],
    queryFn: () => get_fingerprint_data(false),
  });
  const applicantMutation = useMutation((data) => updateAplicant(data));

  const findMatchingTemplates = async () => {
    setMatchingTemplates({ normal: [], abnormal: [] });
    const ownerGroups = fingerprint_data?.reduce((groups, item) => {
      const owner = item.owner.id;
      if (!groups[owner]) {
        groups[owner] = [];
      }
      groups[owner].push(item);
      return groups;
    }, {});

    // Flatten the grouped objects into a new array
    const filteredArray = Object.values(ownerGroups).map((group) => group[0]);

    console.log("filteredArrayfilteredArray", filteredArray, ownerGroups);
    if (!isLoading && filteredArray?.length) {
      for (let i = 0; i < filteredArray.length; i++) {
        for (let j = i + 1; j < filteredArray.length; j++) {
          matchingfinger_templates(
            filteredArray[i],
            filteredArray[j],
            setMatchingTemplates
          );
          // console.log("matchScore111111",matchScore)
        }
      }
    }
  };

  // console.log("fingerprint data",fingerprint_data)
  // console.log("matchingTemplatesmatchingTemplates",matchingTemplates)
  useEffect(() => {
    // canceling abnormal duplicates
    if (matchingTemplates.abnormal.length) {
      matchingTemplates.abnormal.map((temp) => {
        const data1 = moment(temp.tem1.created_at);
        const data2 = moment(temp.tem2.created_at);

        if (data1.isAfter(data2)) {
          console.log("heeeeeeeeeere1111");
          applicantMutation.mutate({
            applicant_id: temp.tem1.owner?.id,
            // status: "Cancelled",
            suspected_id: temp.tem2.owner?.id,
            admin: true,
          });
        } else if (data2.isAfter(data1)) {
          applicantMutation.mutate({
            applicant_id: temp.tem2.owner?.id,
            // status: "Cancelled",
            suspected_id: temp.tem1.owner?.id,
            admin: true,
          });
        }
      });
    }

    //add normal to suspected
    if (matchingTemplates.normal.length) {
      matchingTemplates.normal.map((temp) => {
        const data1 = moment(temp.tem1.created_at);
        const data2 = moment(temp.tem2.created_at);

        if (data1.isAfter(data2)) {
          applicantMutation.mutate({
            applicant_id: temp.tem1.owner?.id,
            suspected_id: temp.tem2.owner?.id,
            admin: true,
          });
        } else if (data2.isAfter(data1)) {
          applicantMutation.mutate({
            applicant_id: temp.tem2.owner?.id,
            suspected_id: temp.tem1.owner?.id,
            admin: true,
          });
        }
      });
    }
  }, [matchingTemplates]);

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
      localStorage.removeItem("is_suspected");
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
      Sex: data?.applicant?.sex == "m" ? "Male" : "Female",
      ...data,
    };
  });

  useEffect(() => {
    console.log("heeeeeeeeeeere");
    findMatchingTemplates();
  }, [fingerprint_data]);

  return (
    <div className="">
      <IDsFilter filters={filters} setfilters={setfilters} />

      <div className="bg-slate-200 h-[48px] mb-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium my-6 py-2 px-3">
          Unapproved Applicantions
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
