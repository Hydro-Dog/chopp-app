import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, TextInput } from "react-native-paper";
import { ChoppIcon, ChoppThemedText, useChoppTheme } from "@/shared";
import { ICON_SIZE } from "@/shared/enums";

export default function TabSupportChat() {
  const { theme } = useChoppTheme();
  const [text, setText] = useState("");

  const onSend = () => {
    setText("");
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <ChoppIcon
          size={ICON_SIZE.xl}
          style={{ marginBottom: 20 }}
          color={theme.colors.secondary}
          name="chatbox-ellipses-outline"
        />
      </View>

      <View
        style={{
          width: "85%",
        }}
      >
        {1 && (
          <ChoppThemedText>
            {/* TODO: перевод */}
            Вам ответит свободный оператор
          </ChoppThemedText>
        )}
        <View
          style={{
            marginBottom: 10,
            marginTop: 5,
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <TextInput
            multiline
            value={text}
            onChangeText={setText}
            mode="outlined"
            numberOfLines={1}
            style={{
              flexBasis: "85%",
            }}
          />
          <IconButton
            disabled={!text}
            icon="send"
            iconColor={theme.colors.primary}
            size={32}
            onPress={onSend}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

//TODO: ревизия стилей
const styles = StyleSheet.create({
  container: {
    // display: "flex",
    height: "100%",
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: 64,
  },
  cardIcon: {},
});
