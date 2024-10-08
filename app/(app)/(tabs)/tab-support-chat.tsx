import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ChatHistory } from "@/pages/supportChat";
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

export default function TabSupportChat() {
  const { theme } = useChoppTheme();
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [messages, setMessages] = useState([] as WsMessage[]);
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { lastMessage: chatHistory } = useFilterWsMessages(
    WS_MESSAGE_TYPE.CHAT_HISTORY
  );
  const { lastMessage: typingStatus } = useFilterWsMessages(
    WS_MESSAGE_TYPE.TYPING
  );
  const { lastMessage: currentMessage } = useFilterWsMessages(
    WS_MESSAGE_TYPE.MESSAGE
  );

  useEffect(() => {
    if (currentMessage) {
      setMessages((messages) => [...messages, currentMessage]);
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [currentMessage]);

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
    const newMessage = createWsMessage({
      type: WS_MESSAGE_TYPE.MESSAGE,
      message: text,
      payload: { sender: "user" },
    });
    setText("");
    setMessages((messages) => [...messages, newMessage]);
    dispatch(wsSend(newMessage));
  };

  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [typingStatus?.code]);

  return (
    <SafeAreaView style={styles.container}>
      <ChatHistory
        ref={flatListRef}
        messages={messages}
        isTyping={typingStatus?.code === "typingStarted"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              onFocus={() => {
                setTimeout(() => {
                  flatListRef.current.scrollToEnd({ animated: true });
                }, 100);
              }}
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
  inputContainer2: {
    // flexDirection: "row",
    // padding: 10,
    // width: '100%'
  },
  keyboardAwareContainer: {},
  chatContainer: {},
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
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
