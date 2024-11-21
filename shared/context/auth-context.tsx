import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useSetInterceptors } from "@/services";

export type AuthContextType = {
  auth?: AuthType;
  isAsyncStorageLoaded?: boolean;
  setAuth?: Dispatch<SetStateAction<AuthType | undefined>>;
  setIsAsyncStorageLoaded?: Dispatch<SetStateAction<boolean>>;
};

export type AuthType = {
  accessToken?: string;
  refreshToken?: string;
};

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  isAsyncStorageLoaded: false,
  setAuth: undefined,
  setIsAsyncStorageLoaded: undefined,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const {
    clearInterceptors,
    isAsyncStorageLoaded,
    setIsAsyncStorageLoaded,
    auth,
    setAuth,
  } = useSetInterceptors();

  useEffect(() => {
    return () => {
      clearInterceptors();
    };
  }, [clearInterceptors]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAsyncStorageLoaded,
        setIsAsyncStorageLoaded,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
