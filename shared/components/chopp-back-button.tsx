import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

type Props = {
  title?: string;
  style?: Record<string, any>;
  redirectToRoot?: boolean;
};

export const ChoppBackButton = ({ title, redirectToRoot, ...props }: Props) => {
  const { t } = useTranslation();
  const { back, push } = useRouter();

  const goBack = () => {
    try {
      if (redirectToRoot) {
        push("/");
      } else {
        back();
      }
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
