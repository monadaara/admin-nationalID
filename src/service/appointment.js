import apiClient from "./api-client";

const appointment_endpointment = "pre/appointments/";
const application_endpoint = "pre/applications/";
const document_endpoint = "pre/document/";
const address_endpoint = "pre/address/";

export const getAppointments = async (
  pageParam = 1,
  date,
  code = "",
  name = "",
  stage = 1
) => {
  const { data } = await apiClient.get(
    `${appointment_endpointment}?page=${pageParam}&date=${date}&applicant__status=Booked&center=&ordering=date&applicant__stage=${stage}&applicant__first_name=${name}&applicant__transaction_code=${code}`
  );

  return data;
};

export const getAplicant = async (id) => {
  const { data } = await apiClient.get(`${application_endpoint}${id}/`);

  return data;
};
export const updateAplicant = async (data) => {
  const { data: applicant } = await apiClient.put(
    `${application_endpoint}${data.applicant_id}/`,
    data
  );

  return applicant;
};
export const updateAddress = async (data) => {
  const { data: address } = await apiClient.put(
    `${address_endpoint}${data.id}/`,
    data
  );

  return address;
};

export const setDocument = async (data) => {
  const { data: doc } = await apiClient.post(`${document_endpoint}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return doc;
};
