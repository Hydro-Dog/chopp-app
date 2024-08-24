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
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { formatPhoneNumber, FormField } from "@/shared";
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
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormType> = (data) =>
    console.log(data);

  return (
    <KeyboardAwareScrollView>
      <ThemedView style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <View style={styles.content}>
          <ThemedText type="subtitleBold">Регистрация</ThemedText>
          <FormField errorMessage={errors.fullName?.message}>
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
          </FormField>
          <FormField errorMessage={errors.phoneNumber?.message}>
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
          </FormField>
          <FormField errorMessage={errors.email?.message}>
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
          </FormField>
          <FormField errorMessage={errors.password?.message}>
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
          </FormField>

          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Зарегистрироваться
          </Button>
        </View>
      </ThemedView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    margin: 24,
  },
  logo: {
    width: 256,
    height: 256,
  },
  content: {
    width: "80%",
  },
});
