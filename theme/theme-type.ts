import { LIGHT_THEME } from "./colors";

export type ChopThemeType = {
  dark: boolean;
  colors: typeof LIGHT_THEME.colors;
};
