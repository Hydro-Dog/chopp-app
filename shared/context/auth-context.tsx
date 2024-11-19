import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useSetInterceptors } from "@/services";

export type AuthContextType = {
  auth?: AuthType;
  isAsyncStorageLoaded: boolean;
};

export type AuthType = {
  accessToken?: string;
  refreshToken?: string;
};

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  isAsyncStorageLoaded: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const { clearInterceptors, isAsyncStorageLoaded, auth } =
    useSetInterceptors();

  useEffect(() => {
    return () => {
      console.log("clearInterceptors");
      clearInterceptors();
    };
  }, [clearInterceptors]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAsyncStorageLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
