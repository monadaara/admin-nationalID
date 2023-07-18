import apiClient from "./api-client";

const center_endpoint = "core/centers/";
const location_endpoint = "/core/locations/";
export const getCenters = async () => {
  const { data } = await apiClient.get(center_endpoint);

  return data;
};

export const setCenterLocation = async (data) => {
  const { data: location } = await apiClient.post(location_endpoint, data);
  return location;
};
export const setCenter = async (data) => {
  const { data: center } = await apiClient.post(center_endpoint, data);
  return center;
};

export const updateCenterLocation = async (data) => {
  const { data: location } = await apiClient.put(
    `${location_endpoint}${data.location_id}/`,
    data
  );
  return location;
};
export const updateCenter = async (data) => {
  const { data: center } = await apiClient.put(
    `${center_endpoint}${data.center_id}/`,
    data
  );
  return center;
};
export const deleteLocation = async (id) => {
  const { data } = await apiClient.delete(`${location_endpoint}${id}/`);
  return data;
};
