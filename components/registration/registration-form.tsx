import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useBoolean } from "usehooks-ts";
import { RegistrationFormType, registrationSchema } from "./types";
import { ChoppDialog, FETCH_STATUS, useChoppSnackbar } from "@/shared";
import {
  formatPhoneNumber,
  ChoppFormField,
  ChoppCheckbox,
  ChoppThemedText,
} from "@/shared";
import { createUser } from "@/store/slices/user-slice";
import { AppDispatch, RootState } from "@/store/store";
import { useChoppTheme } from "@/theme";
import { SNACKBAR_VARIANTS } from "@/shared/context/chopp-snackbar-context";

export const RegistrationForm = () => {
  const theme = useChoppTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { value: passwordVisible, toggle: togglePasswordVisibility } =
    useBoolean();
  const { createUserStatus } = useSelector((state: RootState) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema(t)),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      isPersonalDataProcessingAccepted: false,
      isOfferAgreementAccepted: false,
    },
  });

  const { push } = useChoppSnackbar();

  const onSubmit: SubmitHandler<RegistrationFormType> = (data) => {
    dispatch(createUser(data))
      .unwrap()
      .then((res) => {
        console.log("Redirect ", res);
        // router.push("/");
      })
      .catch((err) => {
        push({
          id: String(Math.random()),
          variant: SNACKBAR_VARIANTS.INFO,
          text: err.errorMessage,
          actionLabel: "hyi",
        });
        console.log("eeeeeeer: ", err);
      });
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
              //   TODO: перевод
              label="Фио"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.fullName}
            />
          )}
        />
      </ChoppFormField>

      {/* TODO: открыть сразу циифровую клавиатуру */}
      <ChoppFormField errorMessage={errors.phoneNumber?.message}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Телефон"
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
      <ChoppFormField errorMessage={errors.password?.message}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Пароль"
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
      <ChoppFormField
        styles={{ marginBottom: 16 }}
        errorMessage={errors.isPersonalDataProcessingAccepted?.message}
      >
        <Controller
          control={control}
          name="isPersonalDataProcessingAccepted"
          render={({ field: { onChange, value } }) => (
            <ChoppCheckbox
              value={value}
              onChange={onChange}
              label={
                <>
                  <ChoppThemedText>Согласен на </ChoppThemedText>
                  <ChoppThemedText
                    variant="primary"
                    onPress={() => {
                      showModal();
                      setModalData({
                        title: "Условия обработки персональных данных",
                        text: "Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных Условия обработки персональных данных",
                      });
                    }}
                  >
                    обработку персональных данных
                  </ChoppThemedText>
                </>
              }
            />
          )}
        />
      </ChoppFormField>
      <ChoppFormField errorMessage={errors.isOfferAgreementAccepted?.message}>
        <Controller
          control={control}
          name="isOfferAgreementAccepted"
          render={({ field: { onChange, onBlur, value } }) => (
            <ChoppCheckbox
              value={value}
              onChange={onChange}
              label={
                <>
                  <ChoppThemedText>Принимаю </ChoppThemedText>
                  <ChoppThemedText
                    variant="primary"
                    onPress={() => {
                      showModal();
                      setModalData({
                        title: "Договор оферты",
                        text: "Договор оферты",
                      });
                    }}
                  >
                    договор оферты
                  </ChoppThemedText>
                </>
              }
            />
          )}
        />
      </ChoppFormField>

      <Button
        mode="outlined"
        style={styles.registerButton}
        loading={createUserStatus === FETCH_STATUS.LOADING}
        disabled={createUserStatus === FETCH_STATUS.LOADING}
        onPress={handleSubmit(onSubmit)}
      >
        {/* TODO: перевод */}
        Зарегистрироваться
      </Button>
      <ChoppDialog
        visible={isModalVisible}
        onClose={hideModal}
        onOk={hideModal}
        {...modalData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    marginTop: 24,
  },
});
