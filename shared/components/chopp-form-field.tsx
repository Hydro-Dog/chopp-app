import { PropsWithChildren } from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { ChoppAnimatedHelperText } from "./chopp-animated-helper-text";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  styles?: Record<string, any>;
};

export const ChoppFormField = ({
  children,
  errorMessage,
  message,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <View style={{ ...styles.field, ...props.styles }}>
      <View style={{ width: "auto", height: "auto" }}>{children}</View>
      <ChoppAnimatedHelperText message={message} errorMessage={errorMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    overflow: "hidden",
  },
  error: {
    height: 24,
  },
});
