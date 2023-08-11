import apiClient from "./api-client";
const center_user_endpoint = "core/center_by_users";
const center_appointment_endpoint = "core/centers_appointement_status";

export const get_centers_by_user = async () => {
  const { data } = await apiClient.get(center_user_endpoint);
  return data;
};
export const get_centers_by_Appointments = async (
  start_date = "",
  end_date = ""
) => {
  const { data } = await apiClient.get(
    center_appointment_endpoint +
      `?start_date=${start_date}&end_date=${end_date}`
  );
  return data;
};
