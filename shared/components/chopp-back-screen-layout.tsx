import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { ChoppBackButton, useChoppTheme } from "@/shared";

type Props = {
  showLogo?: boolean;
  containerStyles?: Record<string, object>;
  loading?: boolean;
};

export default function ChoppBackScreenLayout({
  children,
  showLogo,
  loading,
  containerStyles,
}: Props & PropsWithChildren<object>) {
  const { theme } = useChoppTheme();

  return (
    <View style={styles.container}>
      {showLogo && (
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
      )}
      <ChoppBackButton style={styles.backButton} />
      <View style={{ ...styles.content, ...containerStyles }}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 20 }}
            animating={true}
            color={theme.colors.primary}
          />
        ) : (
          children
        )}
      </View>
    </View>
  );
}

// TODO: Ревизия стилей
const styles = StyleSheet.create({
  container: {
    flexBasis: "100%",
  },
  content: {
    alignItems: "center",
    // height: '100%'
    flexBasis: "100%",
  },
  logo: {
    position: "absolute",
    width: 250,
    height: 250,
    right: -80,
    top: 50,
    opacity: 0.2,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 64,
    marginLeft: 32,
    marginBottom: 16,
  },
  cardStatusChip: {
    // borderRadius: 50,
  },
  cardsContainer: {
    // padding: 12,
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // gap: 8,
    // width: "100%",
  },
  card: {
    // flex: 1,
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
