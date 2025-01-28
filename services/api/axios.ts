import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CONFIG } from "@/my-config";

import { AuthType } from "@/shared/context/auth-context";
import { getFromStorage, clearStorage, addToStorage } from "@/shared/utils/async-storage-methods";

type FailedQueRequest = {
  resolve: (val: unknown) => void;
  reject: (val: unknown) => void;
};

export const axiosDefault = axios.create({ baseURL: CONFIG.apiUrl });

export const axiosPrivate = axios.create({
  baseURL: CONFIG.apiUrl,
  //   headers: { "Content-Type": "application/json" },
});

const refresh = async (setAuth: Dispatch<SetStateAction<AuthType | undefined>>) => {
  const refreshToken = await getFromStorage("refreshToken");
  try {
    const response = await axiosDefault.post("auth/refresh", {
      refreshToken,
    });

    return response.data.accessToken;
  } catch (error) {
    if ((error as any).status === 401) {
      await clearStorage();
      setAuth({});
    }
  }
};

let isRefreshing = false;
let failedQueue: FailedQueRequest[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const useInitAuth = ({
  setIsAsyncStorageLoaded,
  setAuth,
}: {
  setIsAsyncStorageLoaded: Dispatch<SetStateAction<boolean>>;
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
}) => {
  useEffect(() => {
    setIsAsyncStorageLoaded(false);
    const loadAuthData = async () => {
      const accessToken = await getFromStorage("accessToken");
      const refreshToken = await getFromStorage("refreshToken");

      if (accessToken && refreshToken) {
        setAuth({ accessToken, refreshToken });
      }
      setIsAsyncStorageLoaded(true);
    };

    loadAuthData();
  }, [setAuth, setIsAsyncStorageLoaded]);
};

export const useSetInterceptors = () => {
  const [auth, setAuth] = useState<AuthType>();
  const [isAsyncStorageLoaded, setIsAsyncStorageLoaded] = useState(false);

  useInitAuth({ setAuth, setIsAsyncStorageLoaded });

  // Интерсептор запросов для добавления токена авторизации
  const requestInterceptor = axiosPrivate.interceptors.request.use(
    async (config) => {
      const accessToken = await getFromStorage("accessToken");

      if (accessToken && !config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseInterceptor = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && [401, 403].includes(error.response.status) && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return axiosPrivate(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refresh(setAuth); // Получаем новый токен
          await addToStorage("accessToken", newToken); // Обновляем токен в хранилище
          axiosPrivate.defaults.headers.common["Authorization"] = "Bearer " + newToken; // Обновляем токен в axios
          originalRequest.headers["Authorization"] = "Bearer " + newToken; // Обновляем заголовки в повторном запросе
          processQueue(null, newToken); // Продолжаем выполнение ожидающих запросов
          return axiosPrivate(originalRequest); // Отправляем повторный запрос с новым токеном
        } catch (refreshError) {
          processQueue(refreshError, null); // Обрабатываем ошибку
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return {
    isAsyncStorageLoaded,
    setIsAsyncStorageLoaded,
    auth,
    setAuth,
    clearInterceptors: () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    },
  };
};
