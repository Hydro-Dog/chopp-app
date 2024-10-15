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
import { SupportChat } from "@/pages/supportChat";
import {
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
  const flatListRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([] as WsMessage[]);
  const dispatch = useDispatch<AppDispatch>();
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { lastMessage: chatHistory } = useFilterWsMessages(
    WS_MESSAGE_TYPE.CHAT_HISTORY,
  );
  const { lastMessage: typingStatus } = useFilterWsMessages(
    WS_MESSAGE_TYPE.TYPING,
  );
  const { lastMessage: currentMessage } = useFilterWsMessages(
    WS_MESSAGE_TYPE.MESSAGE,
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
    const newMessage = createWsMessage({
      type: WS_MESSAGE_TYPE.MESSAGE,
      message: messageText,
      payload: { sender: "user" },
    });
    setMessageText("");
    setMessages((messages) => [...messages, newMessage]);
    dispatch(wsSend(newMessage));
  };

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [typingStatus?.code]);

  return (
    <SafeAreaView style={styles.container}>
      <SupportChat
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
              value={messageText}
              onChangeText={setMessageText}
              mode="outlined"
              numberOfLines={1}
              style={styles.input}
            />
            <IconButton
              disabled={!messageText}
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
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
  },
  input: {
    flex: 1,
  },
});
