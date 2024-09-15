import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useBoolean } from "usehooks-ts";
import { ChoppBigRoundButton, ChoppDialog, ChoppThemedText } from "@/shared";

export default function TabMainScreen() {
  const { t } = useTranslation();
  const onPress = () => showModal();
  const {
    value: isModalVisible,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'flex-end', height: 300 }}>
        <ChoppThemedText type="subtitleBold" style={styles.alarmButtonHint}>
          {t("alarmButtonHint")}
        </ChoppThemedText>
        <ChoppBigRoundButton onPress={onPress} />
      </View>
      <ChoppDialog
        visible={isModalVisible}
        onClose={hideModal}
        onOk={hideModal}
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
