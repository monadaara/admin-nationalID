import axios from "axios";
import { get_logged_user } from "./admin";
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = get_logged_user()?.access;
    if (accessToken) {
      config.headers["Authorization"] = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const refreshToken = get_logged_user()?.refresh;

    // Check if the response status is 401 (Unauthorized) and there's a refresh token
    if (error.response.status === 401 && refreshToken) {
      // Create a new axios instance without interceptors to prevent infinite loop
      const axiosWithoutInterceptors = axios.create({
        baseURL: "http://127.0.0.1:8000/",
      });

      // Use the axios instance to send a request to refresh the access token
      return axiosWithoutInterceptors
        .post("/auth/jwt/refresh/", { refresh: refreshToken })
        .then((response) => {
          // Update the access token in the storage
          localStorage.setItem("logged_user", {
            access: response.data.access,
            refresh: refreshToken,
          });

          // Retry the original request with the new access token
          originalRequest.headers[
            "Authorization"
          ] = `JWT ${response.data.access}`;
          return apiClient(originalRequest);
        })
        .catch((error) => {
          // Handle the token refresh error (e.g., logout the user)
          // You might want to implement custom logic here based on your application's requirements.
          console.error("Error refreshing token:", error);
          // You can log the user out, show an error message, or redirect them to the login page.
          // For simplicity, we'll just log the user out here:

          if (error.response && error.response.status === 401) {
            localStorage.removeItem("logged_user");
            window.location.href = "/login";
          }

          return Promise.reject(error);
        });
    } else {
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
