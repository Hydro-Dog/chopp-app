import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { CONFIG } from "@/my-config";
import { addToStorage, getFromStorage, getStorageAuthData } from "@/shared";
import { AuthType } from "@/shared/context/auth-context";

export const axiosDefault = axios.create({ baseURL: CONFIG.apiUrl });

const refresh = async (
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>,
) => {
  const refreshToken = await getFromStorage("refreshToken");
  const response = await axiosDefault.post("auth/refresh", {
    refreshToken,
  });

  setAuth({
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  });

  addToStorage("accessToken", response.data.accessToken);
  addToStorage("refreshToken", response.data.refreshToken);

  return response.data.accessToken;
};

export const axiosPrivate = axios.create({
  baseURL: CONFIG.apiUrl,
  //   headers: { "Content-Type": "application/json" },
});

// axiosPrivate.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         // Attempt to refresh the token and update header
//         const newToken = await refresh();
//         axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

//         // Clone the original request and retry the request
//         const originalRequest = error.config;
//         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

//         return axios(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

type Args = {
  auth?: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
};

export const useSetInterceptors = () => {
  const [auth, setAuth] = useState<AuthType>();
  const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = useState(false);

  const requestInterceptor = axiosPrivate.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken } = await getStorageAuthData();

      if (accessToken && !config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      if (!auth) {
        setAuth({ accessToken, refreshToken });
      }

      setIsAsyncStorageLoaded(true);

      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseInterceptor = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          // Attempt to refresh the token and update header
          const newToken = await refresh(setAuth);
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

          // Clone the original request and retry the request
          const originalRequest = error.config;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return {
    isAsyncStorageLoaded,
    auth,
    clearInterceptors: () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    },
  };
};
