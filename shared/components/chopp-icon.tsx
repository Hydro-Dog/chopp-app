import Ionicons from "@expo/vector-icons/Ionicons";
import { useChoppTheme } from "../context/chopp-theme-context";
import { ICON_SIZE } from "../enums/size";

type Props = { size: ICON_SIZE; style: Record<string, any>; name?: string };

export const ChoppIcon = (props: Props) => {
  const { theme } = useChoppTheme();
  //@ts-ignore
  return <Ionicons color={theme.colors.text} {...props} />;
};
