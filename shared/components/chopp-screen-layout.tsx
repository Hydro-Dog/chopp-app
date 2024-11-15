import React, { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { ChoppBackButton, useChoppTheme } from "@/shared";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Props = {
  showLogo?: boolean;
  containerStyles?: Record<string, any>;
  customLogo?: ReactNode;
  loading?: boolean;
  showBackButton?: boolean;
};

export default function ChoppScreenLayout({
  children,
  showLogo,
  customLogo,
  loading,
  containerStyles,
  showBackButton,
}: Props & PropsWithChildren<object>) {
  const { theme } = useChoppTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {showLogo && customLogo ? (
          customLogo
        ) : showLogo ? (
          <Image
            style={styles.logo}
            source={theme.dark ? LogoDark : LogoLight}
          />
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: 'hidden',
    alignItems: "center",
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flex: 1,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 16,
  },
});
