import { View, StyleSheet } from "react-native";
import { ProfileItem } from "./components/profile-item";
import { User } from "@/store/slices/user-slice";

const KEYS: (keyof User)[] = ["fullName", "email", "phoneNumber"];

type Props = {
  user?: User;
};

export const ProfileScreen = ({ user }: Props) => {
  return (
    <View style={styles.container}>
      {KEYS.map((item) => (
        // TODO: Перевод
        <ProfileItem key={item} title={item} label={user?.[item]} />
      ))}
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
