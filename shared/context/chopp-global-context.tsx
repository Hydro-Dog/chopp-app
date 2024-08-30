import { PropsWithChildren } from "react";
import { ChoppThemeProvider } from "./chopp-theme-context";
import { ChoppSnackbarStack } from "../components";

export const ChoppGlobalProvider = ({
  children,
}: PropsWithChildren<object>) => {
  return (
    <ChoppThemeProvider>
      <ChoppSnackbarStack>{children}</ChoppSnackbarStack>
    </ChoppThemeProvider>
  );
};
