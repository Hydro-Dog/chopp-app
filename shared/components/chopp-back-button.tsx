import React from "react";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

type Props = {
  title?: string;
  style?: Record<string, any>;
}

export const ChoppBackButton = ({ title = "Back", ...props }: Props) => {
  const { back } = useRouter();

  return (
    <Button icon="arrow-left" onPress={back} {...props}>
      {title}
    </Button>
  );
};
