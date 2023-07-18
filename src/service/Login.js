import apiClient from "./api-client";

export const login = async (data) => {
  const { data: user } = await apiClient.post(`auth/jwt/create`, {
    username: data.username,
    password: data.password,
  });

  return user;
};
