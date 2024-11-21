import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ChoppViewItem } from "../../../shared/components/chopp-view-item";
import { ChoppViewItems, formatPhoneNumber } from "@/shared";
import { User } from "@/store/slices/user-slice/index";

const KEYS: (keyof User)[] = ["fullName", "phoneNumber", "email"];

type Props = {
  user?: User;
  setEditMode?: () => void;
};

export const ProfileScreen = ({ user, setEditMode }: Props) => {
  const { t } = useTranslation();

  const currentUser = user
    ? { ...user, phoneNumber: formatPhoneNumber(user.phoneNumber) }
    : undefined;

  return (
    <View style={styles.container}>
      <ChoppViewItems
        items={KEYS.reduce(
          (acc, key) => ({ ...acc, [t(key)]: currentUser?.[key] }),
          {},
        )}
      />
      <Button mode="contained" onPress={setEditMode}>
        {t("edit")}
      </Button>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.items}>
    //     {KEYS.map((item) => (
    //       <ChoppViewItem
    //         key={item}
    //         title={t(item)}
    //         label={currentUser?.[item]}
    //       />
    //     ))}
    //   </View>
    //   <Button mode="contained" onPress={setEditMode}>
    //     {t("edit")}
    //   </Button>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // paddingVertical: 20,
    flex: 1,
    // paddingBottom: 64,
  },
  items: {
    gap: 16,
  },
});
