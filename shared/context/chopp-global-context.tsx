import { PropsWithChildren } from "react";
import { AuthProvider } from "./auth-context";
import { ChoppThemeProvider } from "./chopp-theme-context";
import { ChoppProtectedRoute, ChoppSnackbarStack } from "../components";

export const ChoppGlobalProvider = ({
  children,
}: PropsWithChildren<object>) => {
  return (
    <AuthProvider>
      <ChoppThemeProvider>
        <ChoppProtectedRoute>
          <ChoppSnackbarStack>{children}</ChoppSnackbarStack>
        </ChoppProtectedRoute>
      </ChoppThemeProvider>
    </AuthProvider>
  );
};
