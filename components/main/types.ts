import { TFunction } from "i18next";
import { z } from "zod";

export const newOrderSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    address: z
      .string()
      .min(1, t("formErrors.emptyText"))
      .max(30, t("formErrors.maxLength", { count: 30 })),
    orderComment: z
      .string()
      .min(1, t("formErrors.emptyText"))
      .max(1000, t("formErrors.maxLength", { count: 1000 })),
  });

export type NewOrderFormType = z.infer<ReturnType<typeof newOrderSchema>>;
