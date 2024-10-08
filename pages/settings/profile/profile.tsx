import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ProfileItem } from "./components/profile-item";
import { User } from "@/store/slices/user-slice";

const KEYS: (keyof User)[] = ["fullName", "phoneNumber", "email"];

type Props = {
  user?: User;
  setEditMode?: () => void;
};

export const ProfileScreen = ({ user, setEditMode }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        {KEYS.map((item) => (
          <ProfileItem key={item} title={t(item)} label={user?.[item]} />
        ))}
      </View>
      <Button onPress={setEditMode}>{t("edit")}</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexBasis: "100%" },
  items: {
    gap: 16,
  },
  button: {
    position: "absolute",
    bottom: 64,
  },
});
