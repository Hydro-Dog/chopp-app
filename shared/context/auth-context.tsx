import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFromStorage } from "../utils";
import { useSetInterceptors } from "@/services";

export type AuthContextType = {
  auth?: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
  isLoaded: boolean;
};

export type AuthType = {
  accessToken?: string;
  refreshToken?: string;
};

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: function (): void {
    throw new Error("setToken Function not implemented.");
  },
  isLoaded: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [auth, setAuth] = useState<AuthType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getStorageData = async () => {
      const accessToken = await getFromStorage("accessToken");
      const refreshToken = await getFromStorage("refreshToken");
      setAuth({ accessToken, refreshToken });
      setIsLoaded(true);
    };

    getStorageData();
  }, [isLoaded]);

  useSetInterceptors({ auth, setAuth });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
