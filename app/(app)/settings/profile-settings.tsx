import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import { ProfileScreen } from "@/pages/settings/profile/profile";
import { ProfileForm } from "@/pages/settings/profile/profile-form";
import { FETCH_STATUS } from "@/shared";
import ChoppBackScreenLayout from "@/shared/components/chopp-back-screen-layout";
import { fetchCurrentUser } from "@/store/slices/user-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function ProfileSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    value: isEditMode,
    setTrue: setEditMode,
    setFalse: setViewMode,
  } = useBoolean();

  const { currentUser, currentUserStatus } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <ChoppBackScreenLayout loading={currentUserStatus !== FETCH_STATUS.SUCCESS}>
      <View style={styles.content}>
        {isEditMode ? (
          <ProfileForm setViewMode={setViewMode} user={currentUser} />
        ) : (
          <ProfileScreen setEditMode={setEditMode} user={currentUser} />
        )}
      </View>
    </ChoppBackScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "80%",
    flexBasis: "80%",
  },
});
