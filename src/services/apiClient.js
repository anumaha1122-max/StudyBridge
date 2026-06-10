import axios from "axios";
import { API_BASE_URL } from "../utils/config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  // Later add JWT token:
  // config.headers.Authorization = "Bearer " + token;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error?.response?.data || error)
);

export default apiClient;
