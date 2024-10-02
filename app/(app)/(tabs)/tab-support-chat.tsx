import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ChatHistory from "@/pages/supportChat/support-chat-history";
import {
  ChoppIcon,
  ChoppThemedText,
  createWsMessage,
  useChoppTheme,
  WS_MESSAGE_TYPE,
  WsMessage,
} from "@/shared";
import { ICON_SIZE } from "@/shared/enums";
import { useFilterWsMessages } from "@/shared/hooks";
import { wsSend } from "@/store/slices/ws-slice";
import { AppDispatch, RootState } from "@/store/store";

// TODO: сейчас поле воода текста - это часть общего вью, а надо чтобы оно было зафиксированно внизу

export default function TabSupportChat() {
  const { theme } = useChoppTheme();
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [messages, setMessages] = useState([] as WsMessage[]);

  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { lastMessage: chatHistory } = useFilterWsMessages(
    WS_MESSAGE_TYPE.CHAT_HISTORY
  );

  useEffect(() => {
    if (wsConnected) {
      dispatch(
        wsSend(
          createWsMessage({
            type: WS_MESSAGE_TYPE.CHAT_HISTORY,
            code: "getHistory",
          })
        )
      );
    }
  }, [dispatch, wsConnected]);

  useEffect(() => {
    if (chatHistory && chatHistory.payload) {
      setMessages(chatHistory.payload as WsMessage[]);
    }
  }, [chatHistory]);

  const onSend = () => {
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.keyboardAwareContainer}
        extraScrollHeight={10}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.chatContainer}>
          <ChatHistory messages={messages} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            value={text}
            onChangeText={setText}
            mode="outlined"
            numberOfLines={1}
            style={styles.input}
          />
          <IconButton
            disabled={!text}
            icon="send"
            iconColor={theme.colors.primary}
            size={32}
            onPress={onSend}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAwareContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});
