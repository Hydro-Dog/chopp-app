import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { ChoppThemedText, useChoppTheme } from "@/shared";

type Props = {
  isDeleteMode: boolean;
  toggleDeleteMode: () => void;
  itemIdsToDelete: number[];
  shoppingCart: { items: { product: { id: number } }[] };
  chooseAllItems: () => void;
  deleteChosenItem: () => void;
};

export const ShoppingCartTopBar = ({
  isDeleteMode,
  toggleDeleteMode,
  itemIdsToDelete,
  shoppingCart,
  chooseAllItems,
  deleteChosenItem,
}: Props) => {
  const { t } = useTranslation();
  const { theme } = useChoppTheme();

  return (
    <View style={styles.topBarWrapper}>
      <View style={styles.titleWrapper}>
        <ChoppThemedText style={styles.header}>{t("shoppingCart")}</ChoppThemedText>
        <Button
          labelStyle={{ color: isDeleteMode ? theme.colors.secondary : theme.colors.primary }}
          onPress={toggleDeleteMode}
        >
          {t(isDeleteMode ? "cancel" : "delete")}
        </Button>
      </View>
      <View style={styles.deleteMenuButtonsWrapper}>
        {isDeleteMode && (
          <View style={styles.deleteMenuButtons}>
            <View style={styles.deleteMenuCheckbox}>
              <ChoppThemedText>{t("chooseAll")}</ChoppThemedText>
              <Checkbox
                status={itemIdsToDelete.length === shoppingCart.items.length ? "checked" : "unchecked"}
                onPress={chooseAllItems}
              />
            </View>
            <Button onPress={deleteChosenItem}>{t("delete")}</Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBarWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 15,
  },
  deleteMenuButtonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  deleteMenuButtons: {
    paddingInline: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  deleteMenuCheckbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
  },
});
