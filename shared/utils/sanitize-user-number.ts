import { UserRegisterDTO } from "@/store/slices/user-slice/index";
import { removeDashesFromPhoneNumber } from "./remove-dashes-from-phoneNumber";

export const sanitizedUser = (user: Partial<UserRegisterDTO>) => {
  const sanitzedUser = {
    ...user,
    phoneNumber:
      user.phoneNumber && removeDashesFromPhoneNumber(user.phoneNumber),
  };

  return sanitzedUser;
};
