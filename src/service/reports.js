import apiClient from "./api-client";
const center_user_endpoint = "core/center_by_users";

export const get_centers_by_user = async () => {
  const { data } = await apiClient.get(center_user_endpoint);
  return data;
};
