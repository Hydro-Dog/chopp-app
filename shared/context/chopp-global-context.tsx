import { PropsWithChildren } from "react";
import { ChoppSnackbarStackWrapper } from "./chopp-snackbar-context";
import { ChopThemeProvider } from "./chopp-theme-сontext";

export const ChoppGlobalProvider = ({
  children,
}: PropsWithChildren<object>) => {
  return (
    <ChopThemeProvider>
      <ChoppSnackbarStackWrapper>{children}</ChoppSnackbarStackWrapper>
    </ChopThemeProvider>
  );
};
