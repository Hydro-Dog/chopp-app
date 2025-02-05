import { TFunction } from "i18next";
import { z } from "zod";

// TODO: переделать схемы на хуки как в Админке
export const OrderAdditionalInfoFormSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    address: z
      .string()
      .min(10, `${t("formErrors.minLength", { count: 10 })}`)
      .max(1024, `${t("formErrors.maxLength", { count: 1024 })}`),
    comment: z.string().max(2048, `${t("formErrors.maxLength", { count: 2048 })}`),
  });

export type OrderAdditionalInfoFormType = z.infer<ReturnType<typeof OrderAdditionalInfoFormSchema>>;
