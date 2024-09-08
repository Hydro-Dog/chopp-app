import Ionicons from "@expo/vector-icons/Ionicons";
import { useChoppTheme } from "../context";

export const ChoppIcon = (props: typeof Ionicons) => {
  const { theme } = useChoppTheme();
  return <Ionicons color={theme.colors.text} {...props}/>;
};
