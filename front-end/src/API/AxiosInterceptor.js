import axios from "axios";

const API_URL = "http://localhost:8000";
const url = `${API_URL}/user/orders/`;
const axiosInstance = axios.create({
  headers: {
    Authorization: localStorage.getItem("access")
      ? "Bearer " + localStorage.getItem("access")
      : null,
    "Content-Type": "application/json",
    accept: "application/json"
  },
  params: { username: "hayleeluu" }
});
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (
      localStorage.getItem("refresh") &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = localStorage.getItem("refresh");

      return axiosInstance
        .post(`${API_URL}/token/refresh/`, { refresh: refresh_token })
        .then(response => {
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);

          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + response.data.access;
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.access;

          return axiosInstance(originalRequest);
        })
        .catch(err => {
          console.log(err);
        });
    }
    return Promise.reject({ ...error });
  }
);
export default axiosInstance;
