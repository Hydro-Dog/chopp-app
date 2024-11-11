export type User = {
  id: string;
  token?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  chatWithAdminId?: string;
};

export type UserRegisterDTO = Omit<User, "id" | "token"> & { password: string };
export type UserLoginDTO = { login: string; password: string };

export type UserAuthorization = {
  accessToken: string;
  refreshToken: string;
};
