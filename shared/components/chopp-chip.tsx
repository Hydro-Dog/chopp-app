import { PropsWithChildren } from "react";
import { Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useChoppTheme } from "../context/chopp-theme-context";

type Props = {
  backgroundColor?: string;
  iconColor?: string;
  iconName?: string;
  clear?: boolean;
  style?: Record<string, string | number>;
};

export const ChoppChip = ({
  backgroundColor,
  iconColor,
  iconName,
  children,
  clear,
  style = {},
}: PropsWithChildren<Props>) => {
  const { theme } = useChoppTheme();

  return (
    <Chip
      style={{
        backgroundColor: clear
          ? "transparent"
          : backgroundColor || theme.colors.primaryContainer,
        ...style,
      }}
      icon={
        iconName
          ? () => (
              <Ionicons
                style={{ color: iconColor || theme.colors.primary }}
                size={20}
                name={iconName}
              />
            )
          : undefined
      }
    >
      {children}
    </Chip>
  );
};
