import React from "react";
import { View, StyleSheet } from "react-native";
import { ChoppThemedText } from "@/shared";
import { useTranslation } from "react-i18next";

type Props = {
  message: string;
};

export const EmptyCard = ({ message }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.empty}>
      <ChoppThemedText style={styles.emptyText}>{t(message)}</ChoppThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    fontWeight: "100",
  },
});
