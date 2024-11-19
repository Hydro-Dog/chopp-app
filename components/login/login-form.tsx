import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useBoolean } from "usehooks-ts";
import { LoginFormType, loginSchema } from ".";
import {
  useChoppSnackbar,
  SNACKBAR_VARIANTS,
  ChoppFormField,
  FETCH_STATUS,
  addToStorage,
  ErrorResponse,
} from "@/shared";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { login } from "@/store/slices/user-slice/index";
import { RootState, AppDispatch } from "@/store/store";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";
import { useAuth } from "@/shared/context/auth-context";

export const LoginForm = () => {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const { setAuth } = useAuth();
  const router = useRouter();
  const { value: passwordVisible, toggle: togglePasswordVisibility } =
    useBoolean();
  const { loginStatus } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const { pushNewNotification } = useChoppSnackbar();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      setAuth(res);
      await addToStorage("accessToken", res.accessToken);
      await addToStorage("refreshToken", res.refreshToken);
      router.push("/");
    } catch (error: unknown) {
      pushNewNotification({
        id: String(Math.random()),
        variant: SNACKBAR_VARIANTS.ERROR,
        text: (error as ErrorResponse).message,
      });
    }
  };

  return (
    <View>
      <ChoppFormField errorMessage={errors.phoneNumber?.message}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t("phoneNumber")}
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatPhoneNumber(text))}
              error={!!errors.phoneNumber}
            />
          )}
        />
      </ChoppFormField>

      <ChoppFormField
        errorMessage={errors.password?.message}
        styles={{ width: "" }}
      >
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t("password")}
              secureTextEntry={!passwordVisible}
              value={value}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye-off" : "eye"}
                  color={theme.colors.secondary}
                  size={20}
                  forceTextInputFocus={false}
                  onPress={togglePasswordVisibility}
                />
              }
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.password}
            />
          )}
        />
      </ChoppFormField>

      <Button
        mode="contained"
        style={styles.loginButton}
        loading={loginStatus === FETCH_STATUS.LOADING}
        disabled={loginStatus === FETCH_STATUS.LOADING}
        onPress={handleSubmit(onSubmit)}
      >
        {t("actions.signIn")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 24,
  },
});
