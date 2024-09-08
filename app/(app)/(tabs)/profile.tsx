import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { t } from "i18next";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { ChoppIcon, ChoppThemedText, useChoppTheme } from "@/shared";
import { ICON_SIZE } from "@/shared/enums";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function TabProfileScreen() {
  const { theme } = useChoppTheme();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
      {/* <ChoppThemedText type="subtitleBold">
        {t("welcomeMessage")}
      </ChoppThemedText> */}

      <View style={styles.cardsContainer}>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="power-outline"
              />
              <ChoppThemedText type="bold">Кнопка</ChoppThemedText>
              <ChoppThemedText>Пополните баланс</ChoppThemedText>
              {/* активна */}
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="reader-outline"
              />
              <ChoppThemedText type="bold">История событий</ChoppThemedText>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.cardButton}>Просмотр</Button>
            </Card.Actions>
          </Card>
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
                <ChoppThemedText type="bold">Кошелек:</ChoppThemedText>
                <ChoppThemedText>1990р </ChoppThemedText>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.cardButton}>Пополнить</Button>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <ChoppIcon
                size={ICON_SIZE.l}
                style={styles.cardIcon}
                name="person-outline"
              />
              <ChoppThemedText type="bold">Профиль</ChoppThemedText>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.cardButton}>Настроить</Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  cardButton: {
    marginTop: 8
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
