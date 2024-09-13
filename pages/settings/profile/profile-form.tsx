import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useBoolean } from "usehooks-ts";
import {
  ChoppDialog,
  FETCH_STATUS,
  SNACKBAR_VARIANTS,
  useChoppSnackbar,
} from "@/shared";
import {
  formatPhoneNumber,
  ChoppFormField,
  ChoppCheckbox,
  ChoppThemedText,
  useChoppTheme,
} from "@/shared";
import { createUser } from "@/store/slices/user-slice";
import { AppDispatch, RootState } from "@/store/store";
import { ProfileFormType, profileSchema } from "./types";

export const ProfileForm = () => {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { value: passwordVisible, toggle: togglePasswordVisibility } =
    useBoolean();
  const { createUserStatus } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema(t)),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const { push } = useChoppSnackbar();

  const onSubmit: SubmitHandler<ProfileFormType> = async (data) => {
    // try {
    //   const res = await dispatch(createUser(data)).unwrap();
    //   console.log("Redirect ", res);
    //   router.push("/login");
    //   //TODO: убрать any
    // } catch (error: any) {
    //   push({
    //     id: String(Math.random()),
    //     variant: SNACKBAR_VARIANTS.ERROR,
    //     text: error.errorMessage,
    //   });
    // }
  };

  const {
    value: isModalVisible,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();

  const [modalData, setModalData] = useState<{ title: string; text: string }>();

  return (
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
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.email}
            />
          )}
        />
      </ChoppFormField>

      <ChoppFormField
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
      </ChoppFormField>

      <Button
        mode="contained"
        style={styles.registerButton}
        loading={createUserStatus === FETCH_STATUS.LOADING}
        disabled={createUserStatus === FETCH_STATUS.LOADING}
        onPress={handleSubmit(onSubmit)}
      >
        {t("actions.register")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    marginTop: 24,
  },
});
