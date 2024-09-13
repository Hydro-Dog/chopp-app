import { View } from "react-native";
import { ChoppThemedText } from "@/shared";

type Props = {
  title: string;
  label?: string | number;
  containerStyle?: Record<string, any>;
};

export const ProfileItem = ({ title, label, containerStyle }: Props) => {
  return (
    <View style={containerStyle}>
      <ChoppThemedText variant="secondary">{title} </ChoppThemedText>
      <ChoppThemedText type="subtitleBold">{label}</ChoppThemedText>
    </View>
  );
};
