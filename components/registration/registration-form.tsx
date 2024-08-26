import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, TextInput } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@react-navigation/native";
import { TFunction } from "i18next";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { ChoppDialog, ChoppThemedView } from "@/shared";
import {
  formatPhoneNumber,
  ChoppFormField,
  ChoppCheckbox,
  ChoppThemedText,
} from "@/shared";
import { ChopThemeType } from "@/theme/theme-type";

const registrationSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    fullName: z
      .string()
      .min(1, t("errors.emptyText"))
      .max(30, t("errors.maxLength", { count: 30 })),
    phoneNumber: z
      .string()
      .regex(
        /^[78]-(\d{3})-(\d{3})-(\d{2})-(\d{2})$/,
        t("errors.invalidPhoneNumber")
      ),
    email: z
      .string()
      .email(t("errors.invalidEmail"))
      .max(30, t("errors.maxLength", { count: 30 })),
    password: z
      .string()
      .min(8, t("errors.minLength", { count: 8 }))
      .max(30, t("errors.maxLength", { count: 30 })),
    isPersonalDataProcessingAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: t("errors.mustAccept"),
      }),
    isOfferAgreementAccepted: z.boolean().refine((val) => val === true, {
      message: t("errors.mustAccept"),
    }),
  });

type RegistrationFormType = z.infer<ReturnType<typeof registrationSchema>>;

export const RegistrationForm = () => {
  const { t } = useTranslation();
  const theme = useTheme() as ChopThemeType;
  const { value: passwordVisible, toggle: togglePasswordVisibility } =
    useBoolean();

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

  const onSubmit: SubmitHandler<RegistrationFormType> = (data) =>
    console.log(data);

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
