import React from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { Button, Card } from "react-native-paper";
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
  useChoppTheme,
} from "@/shared";
import { ICON_SIZE } from "@/shared/enums";
import ChoppScreenLayout from "@/shared/components/chopp-screen-layout";

export default function TabSettings() {
  const { theme } = useChoppTheme();
  const router = useRouter();
  const {
    value: isModalVisible,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();

  const onReplenish = () => {
    showModal();
  };

  return (
    <ChoppScreenLayout>
      <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />

      <View style={styles.cardsContainer}>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="reader-outline"
              />
              <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <ChoppThemedText style={{ fontSize: 14 }} type="bold">
                  {t("ordersHistory")}
                </ChoppThemedText>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.cardAction} onPress={onReplenish}>
                {t("open")}
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
              <ChoppThemedText style={{ fontSize: 14 }} type="bold">
                {t("profile")}
              </ChoppThemedText>
            </Card.Content>
            <Card.Actions>
              <Button
                style={styles.cardAction}
                onPress={() => router.push("/control-panel/profile-settings")}
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
    </ChoppScreenLayout>
  );
}

const styles = StyleSheet.create({
  logo2: {
    width: 290,
    height: 360,
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
    width: "100%",
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
