import { TFunction } from "i18next";
import { z } from "zod";

export const InfoForDeliverySchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    address: z
      .string()
      .min(10, `${t("formErrors.minLength", { count: 10 })}`)
      .max(100, `${t("formErrors.maxLength", { count: 100 })}`),
    comment: z.string().max(100, `${t("formErrors.maxLength", { count: 100 })}`),
  });

export type InfoForDeliveryType = z.infer<ReturnType<typeof InfoForDeliverySchema>>;
