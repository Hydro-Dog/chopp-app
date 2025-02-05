import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { OrderAdditionalInfoForm } from "../order-additional-info-form";
import { ChoppThemedText, useChoppTheme } from "@/shared";

type Props = {
  totalPrice: number;
  onClose: () => void;
};

export const OrderAdditionalInfoModal = ({ totalPrice, onClose }: Props) => {
  const { t } = useTranslation();
  const { theme } = useChoppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <IconButton
        style={styles.closeButton}
        icon="close"
        iconColor={theme.colors.primary}
        size={20}
        onPress={onClose}
      />

      <ChoppThemedText>
        {t("inAll")}: {totalPrice}
        {t("currency")}
      </ChoppThemedText>

      <OrderAdditionalInfoForm onClose={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
  },
  container: {
    margin: 10,
    paddingInline: 10,
    paddingBlock: 20,
    borderRadius: 10,
  },
});
