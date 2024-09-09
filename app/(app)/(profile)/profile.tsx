import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Button, Card, Chip, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { t } from "i18next";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { ChoppIcon, ChoppThemedText, useChoppTheme } from "@/shared";
import { ICON_SIZE } from "@/shared/enums";
import { useRouter } from "expo-router";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function ProfileScreen() {
  const { theme } = useChoppTheme();
  const router = useRouter();

  return <View style={styles.container}>Settings</View>;
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
