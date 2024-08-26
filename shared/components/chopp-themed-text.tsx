import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LIGHT_THEME } from "@/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "subtitleBold"
    | "titleBold"
    | "bold";
  variant?: keyof typeof LIGHT_THEME.colors;
};

export function ChoppThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  variant = "text",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant,
  ) as string;

  return (
    <Text
      style={[
        { color },
        { fontFamily: "Nunito" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "titleBold" ? styles.titleBold : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "subtitleBold" ? styles.subtitleBold : undefined,
        type === "link" ? styles.link : undefined,
        type === "bold" ? styles.bold : undefined,

        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Nunito",
    fontWeight: "bold",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  titleBold: {
    fontFamily: "Nunito",
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
  },
  subtitleBold: {
    fontFamily: "Nunito-bold",
    fontSize: 20,
    // fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
