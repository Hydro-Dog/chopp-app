import React, { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { ChoppBackButton, useChoppTheme } from "@/shared";

type Props = {
  showLogo?: boolean;
  containerStyles?: Record<string, any>;
  customLogo?: ReactNode;
  loading?: boolean;
  showBackButton?: boolean;
};

export default function ChoppBackScreenLayout({
  children,
  showLogo,
  customLogo,
  loading,
  containerStyles,
  showBackButton = true,
}: Props & PropsWithChildren<object>) {
  const { theme } = useChoppTheme();

  return (
    <View style={styles.container}>
      {showLogo && customLogo ? (
        customLogo
      ) : showLogo ? (
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
      ) : (
        <></>
      )}
      {showBackButton && <ChoppBackButton style={styles.backButton} />}
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

const styles = StyleSheet.create({
  container: {
    flexBasis: "100%",
  },
  content: {
    alignItems: "center",
    flexBasis: "100%",
  },
  logo: {
    position: "fixed",
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
});
