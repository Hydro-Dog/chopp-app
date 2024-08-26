import React, { ReactNode } from "react";
import { ScrollView } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";
import { ChoppThemedText } from "./chopp-themed-text";

type Props = {
  visible?: boolean;
  onClose: () => void;
  onOk?: () => void;
  title?: ReactNode;
  text?: ReactNode;
  okLabel?: string;
};

export const ChoppDialog = ({
  visible,
  onClose,
  onOk,
  title,
  okLabel,
  text,
}: Props) => {
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
            <ChoppThemedText>{text}</ChoppThemedText>
          </Dialog.Content>
        </ScrollView>
        <Dialog.Actions>
          {/* TODO: перевод */}
          {onOk && <Button onPress={onOk}>{okLabel || "Ok"}</Button>}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
