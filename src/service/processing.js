import apiClient from "./api-client";

const acknowledgement_endpoint = "pre/acknowledgement/";
const ids_endpoint = "ids/";
const fingerprint_endpoint = "pre/fingerprint-templates/";

export const removeBg = async (obj) => {
  // Send the binary data to your Django backend using FormData
  const formData = new FormData();
  formData.append("image", obj.image);
  formData.append("applicant", obj.id);

  const { data } = await apiClient.post("pre/image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
export const updateApplicantImg = async (obj) => {
  const formData = new FormData();
  formData.append("image", obj.image);
  formData.append("applicant", obj.applicant_id);

  const { data } = await apiClient.put("pre/image/" + obj.id + "/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const getAcknowledgement = async (applicant_id) => {
  const { data } = await apiClient.get(
    `${acknowledgement_endpoint}?applicant__id=${applicant_id}`
  );

  return data;
};

export const setIDs = async (data) => {
  const { data: ids } = await apiClient.post(ids_endpoint, data);
  return ids;
};

export const get_nationalID = async (page, code, name, approve) => {
  const { data } = await apiClient.get(
    `${ids_endpoint}?page=${page}&applicant__approved=${approve}&applicant__transaction_code=${code}&applicant__first_name__icontains=${name}`
  );
  return data;
};

export const get_nationalIDByFingerprint = async (id) => {
  const { data } = await apiClient.get(
    `${ids_endpoint}?applicant__fingerprint_template__id=${id}`
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
  const formData = new FormData();
  formData.append("fingerprint_img", data.fingerprint_img);
  formData.append("fingerprint_data", data.fingerprint_data);
  formData.append("owner", data.owner);
  formData.append("finger_name", data.finger_name);
  const { data: fingerprint } = await apiClient.post(
    fingerprint_endpoint,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return fingerprint;
};

export const update_fingerprint = async (data) => {
  const formData = new FormData();
  formData.append("fingerprint_data", data.fingerprint_data);
  formData.append("owner", data.owner);
  formData.append("finger_name", data.finger_name);
  formData.append("fingerprint_img", data.fingerprint_img);
  const { data: fingerprint } = await apiClient.put(
    fingerprint_endpoint + data.id + "/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return fingerprint;
};

export const get_fingerprint_data = async (is_suspected) => {
  const { data } = await apiClient.get(fingerprint_endpoint+`?is_suspected=${is_suspected}`);
  return data;
};
