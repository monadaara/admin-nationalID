import apiClient from "./api-client";

const acknowledgement_endpoint = "acknowledgement/";
const ids_endpoint = "ids/";

export const removeBg = async (image) => {
  // Remove the 'data:image/jpeg;base64,' prefix from the base64 data
  const base64Data = image.split(",")[1];

  // Convert the base64 data to binary
  const binaryData = atob(base64Data);

  // Create a Uint8Array from the binary data
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Send the binary data to your Django backend using FormData
  const formData = new FormData();
  formData.append("image", new Blob([uint8Array], { type: "image/jpeg" }));

  const { data } = await apiClient.post("image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const getAcknowledgement = async (id) => {
  const { data } = await apiClient.get(`${acknowledgement_endpoint}${id}`);

  return data;
};

export const setIDs = async (data) => {
  const { data: ids } = await apiClient.post(ids_endpoint, data);
  return ids;
};
