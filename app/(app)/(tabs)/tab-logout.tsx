import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import ChoppScreenLayout from "@/shared/components/chopp-screen-layout";
import { ChoppThemedText } from "@/shared/components/chopp-themed-text";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";
import { clearStorage } from "@/shared/utils/async-storage-methods";

export default function TabLogout() {
  const router = useRouter();
  const { theme } = useChoppTheme();
  const { t } = useTranslation();

  const onOk = async () => {
    await clearStorage();
    router.push("/login");
  };

  // const onCancel = () => {
  //   router.back();
  // };

  return (
    <ChoppScreenLayout
      showLogo
      customLogo={
        <Ionicons
          size={310}
          name="log-out-outline"
          style={{ color: theme.colors.secondary, ...styles.backgroundIcon }}
        />
      }
      containerStyles={{
        flexBasis: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ChoppThemedText type="subtitleBold" style={{ marginTop: 128 }}>
        {t("logoutFromProfile")}?
      </ChoppThemedText>

      <View style={{ gap: 16, marginBottom: 64, width: "80%" }}>
        <Button mode="contained" onPress={onOk}>
          {t("ok")}
        </Button>
        {/* <Button onPress={onCancel}>{t("cancel")}</Button> */}
      </View>
    </ChoppScreenLayout>
  );
}

// TODO: Ревизия стилей
const styles = StyleSheet.create({
  backgroundIcon: {
    position: "absolute",
    left: -100,
    top: 80,
    opacity: 0.1,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
