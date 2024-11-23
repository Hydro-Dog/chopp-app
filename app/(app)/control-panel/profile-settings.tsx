import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useBoolean } from "usehooks-ts";
import { useChoppTheme, ChoppScreenLayout } from "@/shared";
import { fetchCurrentUser } from "@/store/slices/user-slice";
import { AppDispatch, RootState } from "@/store/store";
import { UserProfileForm } from "@/components/settings/profile/user-profile-form";
import { UserProfile } from "@/components/settings/profile/user-profile";

export default function ProfileSettings() {
  const { theme } = useChoppTheme();
  const dispatch = useDispatch<AppDispatch>();
  const {
    value: isEditMode,
    setTrue: setEditMode,
    setFalse: setViewMode,
  } = useBoolean();

  const { fetchCurrentUserStatus } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <ChoppScreenLayout
      redirectToRoot
      showLogo
      showBackButton
      customLogo={
        <Ionicons
          size={310}
          name="settings-outline"
          style={{ color: theme.colors.secondary, ...styles.backgroundIcon }}
        />
      }
    >
      {isEditMode ? (
        <UserProfileForm setViewMode={setViewMode} />
      ) : (
        <UserProfile setEditMode={setEditMode} />
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
