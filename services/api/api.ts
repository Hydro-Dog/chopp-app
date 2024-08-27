import axios from "axios";
import { CONFIG } from "@/my-config";

export const api = axios.create({
  baseURL: CONFIG.apiUrl,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");

    // if (token && config.url !== "/login" && config.url !== "/register") {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('INTERCEPTOPR: ', error)
    // throw new Error(error)
    // return Promise.reject(error);
    // if (error.response && error.response.status === 403) {
    //   // Редирект на страницу входа при 403 ошибке
    //   window.location.href = "/signin";
    //   localStorage.removeItem("token");
    // }
    return Promise.reject(error);
  },
);
