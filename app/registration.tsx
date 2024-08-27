import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { RegistrationForm } from "@/components/registration";
import { ChoppThemedView } from "@/shared";
import { ChoppThemedText } from "@/shared";
import { ChopThemeType } from "@/theme/theme-type";

export default function SignInPage() {
  const theme = useTheme() as ChopThemeType;

  return (
    <KeyboardAwareScrollView>
      <ChoppThemedView style={styles.container}>
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
        <View style={styles.content}>
          <ChoppThemedText type="subtitleBold">Регистрация</ChoppThemedText>
          <RegistrationForm />
        </View>
      </ChoppThemedView>
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
});
