import { TFunction } from "i18next";
import { z } from "zod";

export const loginSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    login: z
      .string()
      .min(1, t("formErrors.emptyText"))
      .max(30, t("formErrors.maxLength", { count: 30 })),
    password: z
      .string()
      .min(8, t("formErrors.minLength", { count: 8 }))
      .max(30, t("formErrors.maxLength", { count: 30 })),
  });

export type LoginFormType = z.infer<ReturnType<typeof loginSchema>>;
