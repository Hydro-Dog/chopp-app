// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { ReactElement, type ComponentProps } from "react";
import { Badge } from "react-native-paper";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";

//TODO: выяснить че это за хуйня (компонент)
export function TabBarIcon({
  style,
  badge,
  ...props
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return (
    <div style={{ position: "relative" }}>
      {badge && (
        <Badge style={{ position: "absolute", zIndex: 10, left: 16, top: -8 }}>
          {badge}
        </Badge>
      )}
      <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...props} />
    </div>
  );
}
