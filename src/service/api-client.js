import axios from "axios";
import { get_logged_user } from "./admin";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

apiClient.defaults.headers.common["Authorization"] = `JWT ${
  get_logged_user().access ? get_logged_user().access : ""
}`;

export default apiClient;
