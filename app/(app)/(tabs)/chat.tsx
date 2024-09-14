import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { t } from "i18next";
import { ChoppThemedText } from "@/shared";

export default function TabMainScreen() {
  return (
    <View style={styles.container}>
      <View>
        <ChoppThemedText type="subtitleBold">
          {t("registration")}
        </ChoppThemedText>

        <Button mode="outlined">{t("actions.login")}</Button>
      </View>
    </View>
  );
}

//TODO: ревизия стилей
const styles = StyleSheet.create({
  container: {},
});
