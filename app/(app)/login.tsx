import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { LoginForm } from "@/components/login/login-form";
import { ChoppThemedText } from "@/shared";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";

export default function LoginPage() {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
        <View style={styles.content}>
          <ChoppThemedText type="subtitleBold">{t("signIn")}</ChoppThemedText>
          <LoginForm />

          <Button
            mode="outlined"
            style={styles.registerButton}
            onPress={() => router.push("/registration")}
          >
            {t("actions.register")}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 64,
  },
  logo: {
    width: 128,
    height: 128,
  },
  content: {
    width: "80%",
  },
  registerButton: {
    marginTop: 20,
    width: "100%",
  },
});
