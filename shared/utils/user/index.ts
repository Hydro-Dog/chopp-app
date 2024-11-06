import { UserRegisterDTO } from '@/store/slices/user-slice';
import { revertPhoneNumberFormating } from './format-phone-number';

export * from './format-phone-number';

export const sanitizedUser = (user: Partial<UserRegisterDTO>) => {
    const  sanitzedUser = {
        ...user,
        phoneNumber: user.phoneNumber && revertPhoneNumberFormating(user.phoneNumber),
    };

    return sanitzedUser;
};
