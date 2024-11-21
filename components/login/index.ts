import { TFunction } from "i18next";
import { z } from "zod";

export const loginSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    phoneNumber: z
      .string()
      .regex(
        /^[78]-(\d{3})-(\d{3})-(\d{2})-(\d{2})$/,
        t("formErrors.invalidPhoneNumber")
      ),
    password: z
      .string()
      .min(8, t("formErrors.minLength", { count: 8 }))
      .max(30, t("formErrors.maxLength", { count: 30 })),
  });

export type LoginFormType = z.infer<ReturnType<typeof loginSchema>>;
