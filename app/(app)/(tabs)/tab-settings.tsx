import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Card, Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { useBoolean } from "usehooks-ts";
import BankMockNoBgPng from "@/assets/bank-mock-np-bg.png";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";

import {
  ChoppDialog,
  ChoppIcon,
  ChoppThemedText,
  SNACKBAR_VARIANTS,
  useChoppSnackbar,
  useChoppTheme,
} from "@/shared";
import { ICON_SIZE } from "@/shared/enums";

export default function TabSettings() {
  const { theme } = useChoppTheme();
  const router = useRouter();
  const { push } = useChoppSnackbar();
  const {
    value: isModalVisible,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();

  const onButtonStatusPressed = () => {
    push({
      id: String(Math.random()),
      variant: SNACKBAR_VARIANTS.SUCCESS,
      text: t("activeButtonHint"),
    });
  };

  const onReplenish = () => {
    showModal();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />

      <View style={styles.cardsContainer}>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="help-buoy-outline"
              />
              <ChoppThemedText type="bold">{t("button")}</ChoppThemedText>
              <Card.Actions>
                <Chip
                  style={{
                    backgroundColor: theme.colors.successContainer,
                    ...styles.cardStatusChip,
                    ...styles.cardAction,
                  }}
                  onPress={onButtonStatusPressed}
                >
                  <ChoppThemedText
                    style={{ fontSize: 14, color: theme.colors.success }}
                  >
                    {t("buttonIsActive")}
                  </ChoppThemedText>
                </Chip>
              </Card.Actions>
            </Card.Content>
          </Card>
          {/* <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="reader-outline"
              />
              <ChoppThemedText type="bold">{t("callsHistory")}</ChoppThemedText>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.cardAction}>{t("details")}</Button>
            </Card.Actions>
          </Card> */}
        </View>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="wallet-outline"
              />
              <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <ChoppThemedText type="bold">{t("ballance")}:</ChoppThemedText>
                <ChoppThemedText>1990р </ChoppThemedText>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.cardAction} onPress={onReplenish}>
                {t("replenish")}
              </Button>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="person-outline"
              />
              <ChoppThemedText type="bold">{t("profile")}</ChoppThemedText>
            </Card.Content>
            <Card.Actions>
              <Button
                style={styles.cardAction}
                onPress={() => router.push("/settings/profile-settings")}
              >
                {t("setup")}
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
      <ChoppDialog
        visible={isModalVisible}
        onClose={hideModal}
        onOk={hideModal}
        onCancel={hideModal}
        title={t("payment")}
        content={<Image style={styles.logo2} source={BankMockNoBgPng} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  replenishPng: {},
  logo2: {
    // position: "absolute",
    width: 290,
    height: 360,
    // right: -80,
    // top: 50,
    // opacity: 0.2,
  },
  logo: {
    position: "absolute",
    width: 250,
    height: 250,
    right: -80,
    top: 50,
    opacity: 0.2,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  cardStatusChip: {
    borderRadius: 50,
  },
  cardsContainer: {
    padding: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
  card: {
    flex: 1,
    height: 160,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardAction: {
    marginTop: 8,
  },
  walletTitle: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
    gap: 16,
  },
  button: {
    flex: 1,
  },
});
