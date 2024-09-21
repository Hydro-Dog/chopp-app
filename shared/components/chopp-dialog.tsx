import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";
import { ChoppThemedText } from "./chopp-themed-text";

type Props = {
  visible?: boolean;
  onClose: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  title?: ReactNode;
  text?: ReactNode;
  content?: ReactNode;
  okLabel?: string;
};

export const ChoppDialog = ({
  visible,
  onClose,
  onCancel,
  onOk,
  title,
  okLabel,
  content,
  text,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={!!visible} onDismiss={onClose}>
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {/* Wrap the content in a ScrollView */}
        <ScrollView
          style={{ maxHeight: "80%" }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Dialog.Content>
            {content || <ChoppThemedText>{text}</ChoppThemedText>}
          </Dialog.Content>
        </ScrollView>
        <Dialog.Actions>
          {onCancel && (
            <Button onPress={onCancel}>{okLabel || t("cancel")}</Button>
          )}
          {onOk && <Button onPress={onOk}>{okLabel || t("ok")}</Button>}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
