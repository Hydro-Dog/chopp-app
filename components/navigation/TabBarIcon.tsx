import { type ComponentProps } from "react";
import { View } from "react-native";
import { Badge } from "react-native-paper";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";

export function TabBarIcon({
  style,
  badge,
  ...props
}: IconProps<ComponentProps<typeof Ionicons>["name"]> & {
  badge?: string | number;
}) {
  return (
    <View style={{ position: "relative" }}>
      {badge && (
        <Badge style={{ position: "absolute", zIndex: 10, left: 16, top: -8 }}>
          {badge}
        </Badge>
      )}
      <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...props} />
    </View>
  );
}
