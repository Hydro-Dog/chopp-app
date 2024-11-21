import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { RegistrationForm } from "@/components/registration";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";
import { ChoppThemedText } from "@/shared/components/chopp-themed-text";

export default function RegistrationPage() {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
        <View style={styles.content}>
          <ChoppThemedText type="subtitleBold">
            {t("registration")}
          </ChoppThemedText>
          <RegistrationForm />
          <Button
            mode="outlined"
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            {t("actions.toSignIn")}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 128,
    height: 128,
  },
  content: {
    width: "90%",
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
  },
});
