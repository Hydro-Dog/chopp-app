import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/shared/context/auth-context";

export const useAuthGuard = () => {
  const { auth, isLoaded } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.accessToken && isLoaded) {
      // router.push("/login");
    }
  }, [isLoaded, auth?.accessToken, router]);
};
