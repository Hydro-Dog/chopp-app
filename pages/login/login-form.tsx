import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoolean } from "usehooks-ts";
import { LoginFormType, loginSchema } from ".";
import {
  useChoppSnackbar,
  SNACKBAR_VARIANTS,
  ChoppFormField,
  FETCH_STATUS,
  storeData,
  useAuth,
} from "@/shared";
import { login } from "@/store/slices/user-slice";
import { RootState, AppDispatch } from "@/store/store";
import { useChoppTheme } from "@/theme";

export const LoginForm = () => {
  const theme = useChoppTheme();
  const { t } = useTranslation();
  const { setAuth } = useAuth();
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
      login: "",
      password: "",
    },
  });

  const { push } = useChoppSnackbar();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      console.log("Redirect ", res);
      //TODO: вынести в функцию
      setAuth(res);
      storeData("accessToken", res.accessToken);
      storeData("refreshToken", res.refreshToken);
      // router.push("/");

      //TODO: убрать any
    } catch (error: any) {
      push({
        id: String(Math.random()),
        variant: SNACKBAR_VARIANTS.ERROR,
        text: error.errorMessage,
      });
    }
  };

  return (
    <View>
      <ChoppFormField errorMessage={errors.login?.message}>
        <Controller
          control={control}
          name="login"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t("login")}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.login}
            />
          )}
        />
      </ChoppFormField>

      <ChoppFormField errorMessage={errors.password?.message}>
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
        {t("actions.login")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 24,
  },
});
