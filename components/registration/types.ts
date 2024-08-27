import { TFunction } from "i18next";
import { z } from "zod";

export const registrationSchema = (t: TFunction<"translation", undefined>) =>
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

export type RegistrationFormType = z.infer<
  ReturnType<typeof registrationSchema>
>;
