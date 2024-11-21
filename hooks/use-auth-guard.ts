import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/shared/context/auth-context";

export const useAuthGuard = () => {
  const { auth, isAsyncStorageLoaded } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.accessToken && isAsyncStorageLoaded) {
      router.push("/login");
    }
  }, [isAsyncStorageLoaded, auth?.accessToken, router]);
};
