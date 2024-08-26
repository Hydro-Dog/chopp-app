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
import { RegistrationForm } from "@/components/registration";

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

export default function SignInPage() {
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
    <KeyboardAwareScrollView>
      <ChoppThemedView style={styles.container}>
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
        <View style={styles.content}>
          <ChoppThemedText type="subtitleBold">Регистрация</ChoppThemedText>
          <RegistrationForm />
        </View>
      </ChoppThemedView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 64,
  },
  logo: {
    width: 128,
    height: 128,
  },
  content: {
    width: "80%",
  },
});
