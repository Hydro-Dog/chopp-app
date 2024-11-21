import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { useChoppTheme, ChoppThemedText, ChoppCodeInput } from "@/shared";

export default function VerificationCodePage() {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const [code, setCode] = useState(["", "", "", ""]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
        <ChoppThemedText style={styles.title} type="subtitleBold">
          {t("verificationCode")}
        </ChoppThemedText>
        <ChoppCodeInput code={code} setCode={setCode} />
        <Button
          mode="outlined"
          style={styles.submitButton}
          disabled={code.filter(Boolean).length !== 4}
          onPress={console.log}
        >
          {t("actions.submit")}
        </Button>
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
  title: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 24,
  },
});
