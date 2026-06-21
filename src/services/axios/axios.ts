import axios, { AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import { CONFIG } from "../../config";
import Cookies from "js-cookie";
import { API_ROUTES } from "../../api/api-routes";

const baseConfig: CreateAxiosDefaults<any> | undefined = {
  baseURL: CONFIG.API_BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const axiosPublic = axios.create(baseConfig);
const axiosPrivate = axios.create(baseConfig);

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(CONFIG.API_BASE_URL + API_ROUTES.REFRESH, {}, { withCredentials: true });
        const { accessToken } = response.data;
        Cookies.set("accessToken", accessToken);
        axiosPrivate.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        localStorage.clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const GET_PUBLIC = async <T>(route: string): Promise<T> => {
  return axiosPublic({
    url: route,
    method: "get",
  }).then((res) => res.data);
};

export const POST_PUBLIC = async <T>(route: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return axiosPublic({
    url: route,
    method: "post",
    data,
    ...config,
  }).then((res) => res.data);
};

export const PUT_PUBLIC = async <T>(route: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return axiosPublic({
    url: route,
    method: "put",
    data,
    ...config,
  }).then((res) => res.data);
};

export const GET = async <T>(route: string): Promise<T> => {
  return axiosPrivate({
    url: route,
    method: "get",
  }).then((res) => res.data);
};

export const POST = async <T>(route: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return axiosPrivate({
    url: route,
    method: "post",
    data,
    ...config,
  }).then((res) => res.data);
};

export const DELETE = async <T>(route: string): Promise<T> => {
  return axiosPrivate({
    url: route,
    method: "delete",
  }).then((res) => res.data);
};

export const PATCH = async <T>(route: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return axiosPrivate({
    url: route,
    method: "patch",
    data,
    ...config,
  }).then((res) => res.data);
};

export const PUT = async <T>(route: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return axiosPrivate({
    url: route,
    method: "put",
    data,
    ...config,
  }).then((res) => res.data);
};
