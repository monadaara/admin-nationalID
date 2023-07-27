import apiClient from "./api-client";

const user_endpoint = "auth/users/";
const id_endpoint = "ids/";
export const get_logged_user = () => {
  const logged_user = JSON.parse(localStorage.getItem("logged_user"));
  return logged_user;
};

export const clear_logged_user = () => {
  return localStorage.removeItem("logged_user");
};

export const get_users = async () => {
  const { data } = await apiClient.get(user_endpoint);
  return data;
};
export const set_users = async (data) => {
  const { data: users } = await apiClient.post(user_endpoint, data);
  return users;
};
export const update_users = async (data) => {
  const { data: users } = await apiClient.put(
    `${user_endpoint}${data.id}/`,
    data
  );
  return users;
};
export const delete_users = async (id) => {
  const { data: users } = await apiClient.delete(`${user_endpoint}${id}/`);
  return users;
};

export const get_me = async () => {
  const { data } = await apiClient.get("auth/users/me/");
  return data;
};

// ids
