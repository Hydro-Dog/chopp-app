import { View } from "react-native";
import { ChoppThemedText } from "@/shared";

type Props = {
  title: string;
  label?: string | number;
  containerStyle?: Record<string, any>;
  labelStyle?: Record<string, any>;
};

export const ChoppViewItem = ({
  title,
  label,
  labelStyle,
  containerStyle,
}: Props) => {
  return (
    <View style={containerStyle}>
      <ChoppThemedText variant="secondary">{title} </ChoppThemedText>
      <ChoppThemedText style={labelStyle} type="subtitleBold">
        {label}
      </ChoppThemedText>
    </View>
  );
};