import apiClient from "./api-client";

const appointment_endpointment = "pre/appointments/";
const application_endpoint = "pre/applications/";

export const getAppointments = async (pageParam = 1, date) => {
  const { data } = await apiClient.get(
    `${appointment_endpointment}?page=${pageParam}&date=${date}&applicant__status=Booked&center=&ordering=date&applicant__stage=1`
  );

  return data;
};

export const getAplicant = async (id) => {
  const { data } = await apiClient.get(`${application_endpoint}${id}/`);

  return data;
};
