import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import {
  ChoppBigRoundButton,
  ChoppCallStatusScreen,
  ChoppDialog,
  ChoppThemedText,
  createWsMessage,
} from "@/shared";
import { useFilterWsMessages } from "@/shared/hooks";
import { wsSend } from "@/store/slices/ws-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function TabMainScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const onPress = () => showModal();
  const {
    value: isModalVisible,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { lastMessage } = useFilterWsMessages("callStatus");

  const onCall = () => {
    dispatch(
      wsSend(
        createWsMessage({
          type: "callStatus",
          code: "call",
        }),
      ),
    );
    hideModal();
  };

  useEffect(() => {
    if (wsConnected) {
      console.log("dispatch: callStatus ");
      dispatch(
        wsSend(
          createWsMessage({
            type: "callStatus",
            code: "getCallStatus",
          }),
        ),
      );
    }
  }, [dispatch, wsConnected]);

  return (
    <View style={styles.container}>
      {!lastMessage ? (
        <ActivityIndicator size="large" />
      ) : // TODO: типизация для idle

      lastMessage?.message === "idle" ? (
        <View style={{ justifyContent: "flex-end", height: 300 }}>
          <ChoppThemedText type="subtitleBold" style={styles.alarmButtonHint}>
            {t("alarmButtonHint")}
          </ChoppThemedText>
          <ChoppBigRoundButton onPress={onPress} />
        </View>
      ) : (
        <ChoppCallStatusScreen />
      )}
      <ChoppDialog
        visible={isModalVisible}
        onClose={hideModal}
        onOk={onCall}
        onCancel={hideModal}
        title={t("alarmButtonDialogTitle")}
        text={t("alarmButtonDialogText")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alarmButtonHint: {
    marginBottom: 24,
  },
});
