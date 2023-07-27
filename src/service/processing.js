import apiClient from "./api-client";

const acknowledgement_endpoint = "acknowledgement/";
const ids_endpoint = "ids/";
const fingerprint_endpoint = "fingerprint-templates/";

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

export const get_nationalID = async (page, code, name, approve) => {
  console.log("pa", page, code, name);
  const { data } = await apiClient.get(
    `${ids_endpoint}?page=${page}&approved=${approve}&transaction_code=${code}&first_name__icontains=${name}`
  );
  return data;
};

export const update_nationalId = async (data) => {
  const { data: ids } = await apiClient.patch(
    ids_endpoint + data.national_id + "/",
    data
  );
  return ids;
};

// fingerdata

export const set_fingerprint = async (data) => {
  const base64Data = data.fingerprint_img.split(",")[1];
  const binaryData = atob(base64Data);
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  const formData = new FormData();
  formData.append(
    "fingerprint_img",
    new Blob([uint8Array], { type: "image/jpeg" })
  );

  formData.append("fingerprint_data", data.fingerprint_data);
  formData.append("owner", data.owner);
  const { data: fingerprint } = await apiClient.post(
    fingerprint_endpoint,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return fingerprint;
};
