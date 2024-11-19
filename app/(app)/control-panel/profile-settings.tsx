import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useBoolean } from "usehooks-ts";
import { ProfileScreen } from "@/components/settings/profile/profile";
import { ProfileForm } from "@/components/settings/profile/profile-form";
import { FETCH_STATUS } from "@/shared";
import ChoppScreenLayout from "@/shared/components/chopp-screen-layout";
import { AppDispatch, RootState } from "@/store/store";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";

export default function ProfileSettings() {
  const { theme } = useChoppTheme();
  const dispatch = useDispatch<AppDispatch>();
  const {
    value: isEditMode,
    setTrue: setEditMode,
    setFalse: setViewMode,
  } = useBoolean();

  const { currentUser, fetchCurrentUserStatus: currentUserStatus } =
    useSelector((state: RootState) => state.user);

  return (
    <ChoppScreenLayout
      showLogo
      customLogo={
        <Ionicons
          size={310}
          name="settings-outline"
          style={{ color: theme.colors.secondary, ...styles.backgroundIcon }}
        />
      }
      showBackButton
      loading={currentUserStatus === FETCH_STATUS.LOADING}
    >
      {isEditMode ? (
        <ProfileForm setViewMode={setViewMode} user={currentUser} />
      ) : (
        <ProfileScreen setEditMode={setEditMode} user={currentUser} />
      )}
    </ChoppScreenLayout>
  );
}

const styles = StyleSheet.create({
  backgroundIcon: {
    position: "absolute",
    right: -140,
    bottom: 160,
    opacity: 0.1,
  },
  content: {
    // width: "90%",
    // flex: 1
    // flexBasis: "80%",
  },
});
