import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import { RegistrationForm } from "@/pages/registration";
import { ProfileScreen } from "@/pages/settings/profile/profile";
import { ProfileForm } from "@/pages/settings/profile/profile-form";
import { ChoppDialog, FETCH_STATUS } from "@/shared";
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
  const {
    value: isModalVisible,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean(true);

  const { currentUser, currentUserStatus, currentUserError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  console.log("currentUserStatus: ", currentUserStatus);

  return (
    <ChoppBackScreenLayout loading={currentUserStatus !== FETCH_STATUS.SUCCESS}>
      <View style={styles.dialogContent}>
        {isEditMode ? (
          <ProfileForm setViewMode={setViewMode} user={currentUser} />
        ) : (
          <ProfileScreen setEditMode={setEditMode} user={currentUser} />
        )}
        {/* TODO: перевод */}
      </View>
    </ChoppBackScreenLayout>
  );
}

// TODO: Ревизия стилей
const styles = StyleSheet.create({
  dialogContent: {
    width: "80%",
    flexBasis: "80%",
  },
  container: {
    // display: "flex",
    // height: "100%",
    // flexDirection: "column",
    // alignItems: "center",
    // marginTop: 64,
  },
  logo: {
    width: 128,
    height: 128,
  },
  content: {
    // width: "80%",
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
  },
});
