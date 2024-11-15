import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useBoolean } from "usehooks-ts";
import { ProfileScreen } from "@/pages/settings/profile/profile";
import { ProfileForm } from "@/pages/settings/profile/profile-form";
import { FETCH_STATUS, useChoppTheme } from "@/shared";
import ChoppScreenLayout from "@/shared/components/chopp-screen-layout";
import { fetchCurrentUser } from "@/store/slices/user-slice";
import { AppDispatch, RootState } from "@/store/store";

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
