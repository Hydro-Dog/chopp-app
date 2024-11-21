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

  const goBack = () => {
    try {
      back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button icon="arrow-left" onPress={goBack} {...props}>
      {title || t("back")}
    </Button>
  );
};
