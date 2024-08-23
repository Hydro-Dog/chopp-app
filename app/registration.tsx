import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@react-navigation/native";
import { TFunction } from "i18next";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/Colors";
import { FormField } from "@/shared";
import TextInputMask from "react-native-text-input-mask";

const registrationSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    fullName: z
      .string()
      .min(1, t("errors.emptyText"))
      .max(100, t("errors.maxLength", { count: 100 }))
      .nullish(),
    phoneNumber: z
      .string()
      .regex(/^(\+)?(\d{10,15})$/, t("errors.invalidPhoneNumber"))
      .nullish(),
    email: z
      .string()
      .email(t("errors.invalidEmail"))
      .max(100, t("errors.maxLength", { count: 100 }))
      .nullish(),
    password: z
      .string()
      .min(8, t("errors.minLength", { count: 8 }))
      .max(50, t("errors.maxLength", { count: 50 }))
      .nullish(),
  });

type RegistrationFormType = z.infer<ReturnType<typeof registrationSchema>>;

export default function SignInPage() {
  const { t } = useTranslation();
  const theme = useTheme();
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

  const onSubmit: SubmitHandler<{ fio: string }> = (data) => console.log(data);

  const formatPhoneNumber = (input) => {
    // Удаляем все нецифровые символы
    let numbers = input.replace(/\D/g, '');
  
    // Обрезаем, чтобы предотвратить ввод лишних символов
    numbers = numbers.substring(0, 11);
  
    // Разделяем строку на нужные части и добавляем дефисы
    const parts = [];
    if (numbers.length > 0) parts.push(numbers.substring(0, 1));
    if (numbers.length > 1) parts.push(numbers.substring(1, 4));
    if (numbers.length > 4) parts.push(numbers.substring(4, 7));
    if (numbers.length > 7) parts.push(numbers.substring(7, 9));
    if (numbers.length > 9) parts.push(numbers.substring(9, 11));
  
    // Собираем части в одну строку
    return parts.join('-');
  };
  
  const handlePhoneNumberChange = (text, onChange) => {
    const formatted = formatPhoneNumber(text);
    onChange(formatted);
  };

  return (
    <ThemedView style={styles.container}>
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
                placeholder="Type something"
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
                placeholder="Type something"
                value={value}
                onBlur={onBlur}
                onChangeText={(text) => handlePhoneNumberChange(text, onChange)}
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
                placeholder="Type something"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.email}
              />
            )}
          />
        </FormField>
        <FormField
          errorMessage={errors.password?.message}
          // icon={
          //   <IconButton
          //     icon={passwordVisible ? 'eye-off' : 'eye'}
          //     iconColor={theme.colors.primaryContainer}
          //     size={20}
          //     onPress={() => console.log("Pressed")}
          //   />
          // }
        >
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Пароль"
                placeholder="Type something"
                secureTextEntry={!passwordVisible}
                value={value}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    iconColor={theme.colors.primaryContainer}
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

        <Button icon="camera" mode="contained" onPress={handleSubmit(onSubmit)}>
          Press me
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  content: {
    width: "80%",
    margin: "auto",
  },
});
