import React, { PropsWithChildren, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { isUserAuthenticated } from "./utils";

export default function ProtectedRoute({
  children,
}: PropsWithChildren<object>) {
    console.log('ProtectedRoute!!')
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isUserAuthenticated();
      console.log('authenticated: ', authenticated)
      if (!authenticated) {
        router.replace("/signin");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return children;
}
