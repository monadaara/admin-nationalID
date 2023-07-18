import apiClient from "./api-client";

export const get_logged_user = () => {
  const logged_user = JSON.parse(localStorage.getItem("logged_user"));
  return logged_user;
};

export const clear_logged_user = () => {
  return localStorage.removeItem("logged_user");
};

export const get_users = async () => {
  const { data } = await apiClient.get("auth/users/");
  return data;
};
