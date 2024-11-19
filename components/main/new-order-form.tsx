import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewOrderFormType, newOrderSchema } from "./types";
import {
  SNACKBAR_VARIANTS,
  useChoppSnackbar,
  ChoppFormField,
  ChoppBigRoundButton,
  FETCH_STATUS,
} from "@/shared/index";
import { createOrder, Order } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export const NewOrderForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { createOrderStatus } = useSelector((state: RootState) => state.order);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewOrderFormType>({
    resolver: zodResolver(newOrderSchema(t)),
    defaultValues: {
      address: "",
      orderComment: "",
    },
  });

  const { pushNewNotification } = useChoppSnackbar();

  const onSubmit: SubmitHandler<NewOrderFormType> = async (data) => {
    try {
      const res = await dispatch(
        createOrder(data as Omit<Order, "id">),
      ).unwrap();
    } catch (error: any) {
      pushNewNotification({
        id: String(Math.random()),
        variant: SNACKBAR_VARIANTS.ERROR,
        text: error.errorMessage,
      });
    }
  };

  return (
    <View>
      <ChoppFormField errorMessage={errors.address?.message}>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t("orderAddress")}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.address}
            />
          )}
        />
      </ChoppFormField>

      <ChoppFormField errorMessage={errors.orderComment?.message}>
        <Controller
          control={control}
          name="orderComment"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              numberOfLines={5}
              mode="outlined"
              label={t("orderComment")}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.orderComment}
            />
          )}
        />
      </ChoppFormField>

      <ChoppBigRoundButton
        loading={createOrderStatus === FETCH_STATUS.LOADING}
        title={t("orderAction")}
        onPress={handleSubmit(onSubmit)}
      ></ChoppBigRoundButton>
    </View>
  );
};

const styles = StyleSheet.create({
  registerButton: {
    marginTop: 24,
  },
});
