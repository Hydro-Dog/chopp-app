import { useState, useTransition } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFunction } from "i18next";
import { z } from "zod";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FormField } from "@/shared";

// Определение схемы валидации с помощью Zod
const signInSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    fio: z
      .string()
      .min(1, t("errors.emptyText"))
      .max(30, t("errors.maxLength", { count: 30 }))
      .nullish(),
  });

export default function SignInPage() {
  
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ fio: string }>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      fio: "",
    },
  });

  const onSubmit: SubmitHandler<{ fio: string }> = (data) => console.log(data);

  return (
    <ThemedView style={styles.container} >
      <View style={styles.content}>
        <ThemedText type="subtitle">Регистрация</ThemedText>

        <FormField errorMessage={errors.fio?.message}>
          <Controller
            control={control}
            name="fio"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Фио"
                placeholder="Type something"
                right={<TextInput.Affix text="/100" />}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.fio}
              />
            )}
          />
        </FormField>
        <FormField errorMessage={errors.fio?.message}>
          <Controller
            control={control}
            name="fio"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Имя"
                placeholder="Type something"
                right={<TextInput.Affix text="/100" />}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.fio}
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
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    display: "flex",
    height: '100%'
  },
  content: {
    width: "80%",
    margin: "auto",
  },
  // field: {
  //   flexDirection: "column",
  //   justifyContent: "space-around",
  //   padding: 20,
  //   // width: "90%",
  //   overflow: 'hidden'
  // },
  // error: {
  //   height: 24,
  //   overflow: 'hidden'
  // },
});
