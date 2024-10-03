import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  ChoppThemedText,
  createWsMessage,
  useChoppTheme,
  WS_MESSAGE_TYPE,
  WsMessage,
} from "@/shared";
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
    WS_MESSAGE_TYPE.CHAT_HISTORY,
  );

  useEffect(() => {
    if (wsConnected) {
      dispatch(
        wsSend(
          createWsMessage({
            type: WS_MESSAGE_TYPE.CHAT_HISTORY,
            code: "getHistory",
          }),
        ),
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
      <FlatList
        data={messages}
        renderItem={({ item: msg }) => (
          <View
            key={Math.random()}
            style={[
              styles.messageContainer,
              msg.type === "userMessage"
                ? { backgroundColor: theme.colors.primary }
                : { backgroundColor: theme.colors.secondary },
            ]}
          >
            <ChoppThemedText style={styles.messageText}>
              {msg.message}
            </ChoppThemedText>
            <ChoppThemedText style={styles.timeText}>
              {new Date(msg.timeStamp).toLocaleTimeString()}
            </ChoppThemedText>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAwareContainer: {},
  chatContainer: {},
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    color: "white",
  },
  timeText: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "white",
  },

  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
