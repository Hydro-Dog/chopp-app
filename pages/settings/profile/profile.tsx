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
    <View style={{ justifyContent: "space-between", flexBasis: "100%" }}>
      <View style={styles.container}>
        {KEYS.map((item) => (
          // TODO: Перевод
          <ProfileItem key={item} title={t(item)} label={user?.[item]} />
        ))}
      </View>
      <Button onPress={setEditMode}>Редактировать</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  button: {
    position: "absolute",
    bottom: 64,
  },
});
