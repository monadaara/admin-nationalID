import apiClient from "./api-client";

export const weekly_report = async () => {
  const { data } = await apiClient.get("pre/weekly_report_by_application");
  return data;
};
export const application_by_status = async () => {
  const { data } = await apiClient.get("pre/application_by_status");
  return data;
};
export const appointment_report = async () => {
  const { data } = await apiClient.get("pre/by_status_appointement_report");
  return data;
};
export const top_center = async () => {
  const { data } = await apiClient.get("core/top_centers_reports");
  return data;
};
export const pre_reg = async () => {
  const { data } = await apiClient.get("pre/pre_reg_ids_auth");
  return data;
};
