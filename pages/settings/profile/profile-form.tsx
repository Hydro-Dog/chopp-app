import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useBoolean } from "usehooks-ts";
import { ProfileFormType, profileSchema } from "./types";
import { FETCH_STATUS, SNACKBAR_VARIANTS, useChoppSnackbar } from "@/shared";
import { formatPhoneNumber, ChoppFormField, useChoppTheme } from "@/shared";
import { updateCurrentUser, User } from "@/store/slices/user-slice";
import { AppDispatch, RootState } from "@/store/store";
import { UpdatePassword } from "./components";

type Props = {
  user?: User;
  setViewMode: () => void;
};

export const ProfileForm = ({ user, setViewMode }: Props) => {
  const [passwordMode, setPasswordMode] = useState<"view" | "edit">("view");
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { value: passwordVisible, toggle: togglePasswordVisibility } =
    useBoolean();
  const { updateCurrentUserStatus } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema(t)),
    defaultValues: {
      fullName: user?.fullName,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
    },
  });

  const { push } = useChoppSnackbar();

  const onSubmit: SubmitHandler<ProfileFormType> = async (data) => {
    try {
      await dispatch(updateCurrentUser(data)).unwrap();
      setViewMode();

      //TODO: убрать any
    } catch (error: any) {
      push({
        id: String(Math.random()),
        variant: SNACKBAR_VARIANTS.ERROR,
        text: error.errorMessage,
      });
    }
  };

  const onClose = () => {
    reset();
    setViewMode();
  };

  return (
    <View style={{ justifyContent: "space-between", flexBasis: "100%" }}>
      <View>
        <ChoppFormField errorMessage={errors.fullName?.message}>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label={t("fullName")}
                value={value}
                disabled={passwordMode === "edit"}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.fullName}
              />
            )}
          />
        </ChoppFormField>

        <ChoppFormField errorMessage={errors.phoneNumber?.message}>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="number-pad"
                mode="outlined"
                label={t("phoneNumber")}
                disabled={passwordMode === "edit"}
                value={value}
                onBlur={onBlur}
                onChangeText={(text) => onChange(formatPhoneNumber(text))}
                error={!!errors.phoneNumber}
              />
            )}
          />
        </ChoppFormField>

        <ChoppFormField errorMessage={errors.email?.message}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Email"
                disabled={passwordMode === "edit"}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.email}
              />
            )}
          />
        </ChoppFormField>

        {/* <ChoppFormField
          // TODO: перевод
          message="Введите новый пароль"
          errorMessage={errors.password?.message}
        >
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label={t("password")}
                secureTextEntry={!passwordVisible}
                value={value}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    color={theme.colors.secondary}
                    size={20}
                    forceTextInputFocus={false}
                    onPress={togglePasswordVisibility}
                  />
                }
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.password}
              />
            )}
          />
        </ChoppFormField> */}

        <UpdatePassword mode={passwordMode} setMode={setPasswordMode} />
      </View>
      <View style={{ gap: 16 }}>
        <Button
          mode="contained"
          style={{}}
          loading={updateCurrentUserStatus === FETCH_STATUS.LOADING}
          disabled={
            updateCurrentUserStatus === FETCH_STATUS.LOADING ||
            passwordMode === "edit"
          }
          onPress={handleSubmit(onSubmit)}
        >
          {t("ok")}
        </Button>
        <Button
          style={{}}
          loading={updateCurrentUserStatus === FETCH_STATUS.LOADING}
          onPress={onClose}
        >
          {t("cancel")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    marginTop: 24,
  },
});
