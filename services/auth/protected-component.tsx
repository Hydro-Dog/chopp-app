import React, { PropsWithChildren, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/shared/context/auth-context";

const ProtectedComponent = ({ children }: PropsWithChildren<object>) => {
  const { auth, isAsyncStorageLoaded } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log(
      "ProtectedComponent accessToken: ",
      isAsyncStorageLoaded,
      auth?.accessToken,
    );
    setTimeout(() => {
      if (!auth?.accessToken && isAsyncStorageLoaded) {
        router.replace("/login");
      }
    }, 300);
  }, [auth, router, isAsyncStorageLoaded]);

  if (!auth?.accessToken) {
    return <ActivityIndicator size="large" />;
  }

  return children;
};

export default ProtectedComponent;
