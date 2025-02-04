import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoForDeliverySchema, InfoForDeliveryType } from "./types";
import { ChoppFormField } from "@/shared";

export const InfoForDeliveryForm = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoForDeliveryType>({
    resolver: zodResolver(InfoForDeliverySchema(t)),
    defaultValues: {
      address: "",
      comment: "",
    },
  });
  return (
    <>
      <ChoppFormField errorMessage={errors.comment?.message}>
        <Controller
          control={control}
          name="comment"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t("comment")}
              value={value}
              onBlur={onBlur}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={onChange}
              error={!!errors.comment}
            />
          )}
        />
      </ChoppFormField>

      <ChoppFormField errorMessage={errors.address?.message} styles={{ width: "" }}>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t("address")}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.address}
            />
          )}
        />
      </ChoppFormField>
    </>
  );
};
