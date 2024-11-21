import { PropsWithChildren } from "react";
import { AuthProvider } from "./auth-context";
import { ChoppThemeProvider } from "./chopp-theme-context";
import { ChoppSnackbarStack } from "../components/chopp-snackbar-stack";
import { ChoppDevBar } from "../components/chopp-dev-bar";

export const ChoppGlobalProvider = ({
  children,
}: PropsWithChildren<object>) => {
  return (
    <AuthProvider>
      <ChoppThemeProvider>
        <ChoppSnackbarStack>{children}</ChoppSnackbarStack>
        <ChoppDevBar />
      </ChoppThemeProvider>
    </AuthProvider>
  );
};
