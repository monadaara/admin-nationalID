import apiClient from "./api-client";

const device_endpoint = "core/devices/";

export const getDevices = async () => {
  const { data } = await apiClient.get(device_endpoint);
  return data;
};

export const setDevice = async (data) => {
  const { data: device } = await apiClient.post(device_endpoint, data);
  return device;
};

export const updateDevice = async (data) => {
  const { data: device } = await apiClient.put(
    `${device_endpoint}${data.id}/`,
    data
  );
  return device;
};
export const deleteDevice = async (id) => {
  const { data } = await apiClient.delete(`${device_endpoint}${id}/`);
  return data;
};
