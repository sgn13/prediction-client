import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { queryGenerator } from "@/utils/queryGenerator";

// Define types for your API requests
interface ApiRequestConfig<T> {
  url: string;
  query?: Record<string, string | number | boolean>;
  values?: T;
  config?: AxiosRequestConfig;
}

// Define the type for the response data (you might want to be more specific)
type ApiResponse<T> = T;

//apply base url for axios
// const API_URL = "http://localhost:8000/api/v1/";
// const API_URL = "https://track-it-gilt-zeta.vercel.app/api/v1/"
console.log("API URL:", import.meta.env.API_URL);
const axiosApi = axios.create({
  baseURL: import.meta.env.API_URL||"http://127.0.0.1:8000/api/v1",
  // baseURL: "https://track-it-gilt-zeta.vercel.app/api/v1/",
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access"); // get the token dynamically here
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  },
);

const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => response.data;

const handleError = (error: any): Promise<any> => {
  return Promise.reject(error);
};

export const GET = async <T>({
  url,
  query = {},
  config = {},
}: ApiRequestConfig<undefined>): Promise<ApiResponse<T>> => {
  try {
    const queryString = queryGenerator(query);
    const response = await axiosApi.get<T>(`${url}${queryString}`, { ...config });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const POST = async <T, U>({
  url,
  query = {},
  values,
  config = {},
}: ApiRequestConfig<T>): Promise<ApiResponse<U>> => {
  try {
    const queryString = queryGenerator(query);
    const response = await axiosApi.post<U>(`${url}${queryString}`, values, { ...config });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const PATCH = async <T, U>({
  url,
  query = {},
  values,
  config = {},
}: ApiRequestConfig<T>): Promise<ApiResponse<U>> => {
  try {
    const queryString = queryGenerator(query);
    const response = await axiosApi.patch<U>(`${url}${queryString}`, values, { ...config });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const DELETE = async <T>({
  url,
  query = {},
  config = {},
}: ApiRequestConfig<undefined>): Promise<ApiResponse<T>> => {
  try {
    const queryString = queryGenerator(query);
    const response = await axiosApi.delete<T>(`${url}${queryString}`, {
      ...config,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
