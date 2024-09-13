import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { CONFIG } from "@/my-config";
import { AuthType } from "@/shared";

export const axiosDefault = axios.create({ baseURL: CONFIG.apiUrl });

export const axiosPrivate = axios.create({
  baseURL: CONFIG.apiUrl,
  //   headers: { "Content-Type": "application/json" },
});

type Args = {
  auth?: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
};

const useRefreshToken = ({ auth, setAuth }: Args) => {
  const refresh = async () => {
    const response = await axios.post("/refresh", {
      refreshToken: auth?.refreshToken,
    });

    setAuth({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export const useSetInterceptors = ({ auth, setAuth }: Args) => {
  const refresh = useRefreshToken({ auth, setAuth });

  const requestInterceptor = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseInterceptor = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    },
  );

  // Функция для очистки интерцепторов
  return () => {
    axiosPrivate.interceptors.request.eject(requestInterceptor);
    axiosPrivate.interceptors.response.eject(responseInterceptor);
  };
};
