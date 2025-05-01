import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTP_CODE, IError } from "@/interface";
import { config } from "@/config";
import { extractErrorMessage } from "@/utils/get-error-message";

const ERROR_401 = "/error/401";
const rootApi = config.BASE_URL;

// Create Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: rootApi,
  timeout: 30 * 1000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor: Adds Authorization header with Bearer token if available
 */
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // Retrieve the persisted storage data
      const storage = localStorage.getItem("persist:root");

      if (storage) {
        // Parse the root storage (redux-persist structure)
        const parsedRootStorage = JSON.parse(storage);
        // Check if auth data exists and parse it
        if (parsedRootStorage.auth) {
          const authData = JSON.parse(parsedRootStorage.auth);
          const accessToken = authData.accessToken;

          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
      }
    } catch (error) {
      console.error("Error parsing auth token from storage:", error);
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request interceptor error:", error.message);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor: Handles HTTP status codes and errors
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Log success for OK status
    if (response.status === HTTP_CODE.OK) {
      console.log("Request successful:", response.config.url);
    }
    return response;
  },
  (error: AxiosError<IError>) => {
    // Handle network errors (no response)
    if (!error.response) {
      const errorMessage = "Network Error: Unable to reach the server";
      console.error(errorMessage);
      return Promise.reject(errorMessage);
    }

    // Handle specific HTTP status codes
    const {
      status,
      config: { url },
    } = error.response;
    switch (status) {
      case HTTP_CODE.BAD_REQUEST:
        console.warn(`Bad Request on ${url}:`, extractErrorMessage(error));
        break;

      case HTTP_CODE.UNAUTHORIZED:
        console.warn(`Unauthorized access on ${url}`);
        // Avoid redirect loop and clear storage
        if (window.location.pathname !== ERROR_401) {
          try {
            localStorage.clear();
            console.log("Cleared localStorage due to 401 error");
            window.location.href = ERROR_401; // Redirect to 401 error page
          } catch (clearError) {
            console.error("Error clearing localStorage:", clearError);
          }
        }
        break;

      case HTTP_CODE.FORBIDDEN:
        console.warn(`Forbidden access on ${url}:`, extractErrorMessage(error));
        break;

      case HTTP_CODE.INTERNAL_SERVER_ERROR:
        console.error(`Server error on ${url}:`, extractErrorMessage(error));
        break;

      default:
        console.error(
          `Unexpected error on ${url}:`,
          extractErrorMessage(error)
        );
    }

    // Extract and return error message for downstream handling
    const errorMessage = extractErrorMessage(error);
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
