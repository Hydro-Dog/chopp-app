import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { CONFIG } from "@/my-config";
import {
  addToStorage,
  AuthType,
  getFromStorage,
  getStorageAuthData,
} from "@/shared";

export const axiosDefault = axios.create({ baseURL: CONFIG.apiUrl });

const refresh = async (
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>
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

      return config;
    },
    (error) => Promise.reject(error)
  );

  const res = axiosPrivate.interceptors.response.use(
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
    }
  );
};

// const useRefreshToken = ({ auth, setAuth }: Args) => {
//   const refresh = async () => {
//     const response = await axios.post("/api/refresh", {
//       refreshToken: auth?.refreshToken,
//     });

//     setAuth({
//       accessToken: response.data.accessToken,
//       refreshToken: response.data.refreshToken,
//     });
//     return response.data.accessToken;
//   };
//   return refresh;
// };

// let isAsyncStorageLoaded = false;
// let auth: AuthType = {};

// export const useSetInterceptors = () => {
//   // const [auth, setAuth] = useState<AuthType>();
//   // const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = useState(false);

//   const requestInterceptor = axiosPrivate.interceptors.request.use(
//     async (config) => {
//       console.log("isLocalStorageLoaded: ", isAsyncStorageLoaded);
//       if (!isAsyncStorageLoaded) {
//         const { accessToken, refreshToken } = await getStorageAuthData();
//         auth = { accessToken, refreshToken };
//         isAsyncStorageLoaded = true;
//       }

//       if (isAsyncStorageLoaded && !config.headers["Authorization"]) {
//         if (!auth?.accessToken) {
//           console.warn(
//             'HEADERS: "Authorization" was not provided with accessToken value'
//           );
//         } else {
//           config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
//         }
//       }

//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   const responseInterceptor = axiosPrivate.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       console.log("error?.response: ", error?.response);
//       const prevRequest = error?.config;
//       if (error?.response?.status === 401 && !prevRequest?.sent) {
//         prevRequest.sent = true;
//         const newAccessToken = await refresh();
//         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axiosPrivate(prevRequest);
//       }
//       return Promise.reject(error);
//     }
//   );

//   // Функция для очистки интерцепторов
//   return {
//     isAsyncStorageLoaded,
//     auth,
//     clearInterceptors: () => {
//       axiosPrivate.interceptors.request.eject(requestInterceptor);
//       // axiosPrivate.interceptors.response.eject(responseInterceptor);
//     },
//   };
// };
