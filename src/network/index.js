import axios from "axios";
import { requestHandler, successHandler, errorHandler } from "./interceptors";

axios.defaults.timeout = 3000;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
    platform: "web",
  },
});

// Handle request process
axiosInstance.interceptors.request.use((request) => requestHandler(request));
// Handle response process
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
