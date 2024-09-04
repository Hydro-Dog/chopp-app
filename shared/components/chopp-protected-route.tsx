import { PropsWithChildren } from "react";
import { useNavigationState, useRoute } from "@react-navigation/native";
import { useRootNavigationState, useRouter } from "expo-router";
import { useAuth } from "../context";

export const ChoppProtectedRoute = ({
  children,
}: PropsWithChildren<object>) => {
  const { auth } = useAuth();
  const router = useRouter();
  const state = useNavigationState((state) => state);

  // To get the current route name
  const currentRoute = state.routes[0];

  //Проверяем загрузился ли роутинг
  const rootNavigationState = useRootNavigationState();
  
  //   console.log("rootNavigationState?.key: ", rootNavigationState);
  //   if (!rootNavigationState?.key) return null

//   if (
//     !auth?.accessToken &&
//     rootNavigationState.key &&
//     currentRoute.name !== "login" &&
//     currentRoute.name !== "registration"
//   ) {
//     console.log('HERE')
//     router.push("/login");
//     // return null
//   }

  return children;
};
