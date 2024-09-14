import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

type Props = {
  title?: string;
  style?: Record<string, any>;
};

export const ChoppBackButton = ({ title, ...props }: Props) => {
  const { t } = useTranslation();
  const { back } = useRouter();

  return (
    <Button icon="arrow-left" onPress={back} {...props}>
      {title || t("back")}
    </Button>
  );
};
