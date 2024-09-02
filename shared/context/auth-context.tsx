import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useSetInterceptors } from "@/services";

export type AuthContextType = {
  auth?: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
};

export type AuthType = {
  accessToken: string;
  refreshToken: string;
};

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: function (): void {
    throw new Error("setToken Function not implemented.");
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const [auth, setAuth] = useState<AuthType>();

  useSetInterceptors({ auth, setAuth });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
