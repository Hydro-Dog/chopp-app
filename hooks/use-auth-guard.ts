import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/shared";

export const useAuthGuard = () => {
  const { auth, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.accessToken && isLoaded) {
      router.push("/login");
    }
  }, [isLoaded, auth?.accessToken, router]);
};
