import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Chat } from "@/components/chat";
import useNewIncomingMessageChatHandler from "@/hooks/use-new-incoming-message-chat-handler";
import {
  useChoppTheme,
  ChatMessage,
  useChatsContext,
  WS_MESSAGE_TYPE,
} from "@/shared";
import { wsSend } from "@/store/slices/ws-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function TabSupportChat() {
  const { theme } = useChoppTheme();
  const flatListRef = useRef<FlatList<ChatMessage> | null>(null);
  const [text, setText] = useState("");
  const { chatMessages, setMessages } = useChatsContext();

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  // const { wsConnected } = useSelector((state: RootState) => state.ws);
  // const { lastMessage: chatHistory } = useFilterWsMessages(
  //   WS_MESSAGE_TYPE.CHAT_HISTORY,
  // );
  // const { lastMessage: typingStatus } = useFilterWsMessages(
  //   WS_MESSAGE_TYPE.TYPING,
  // );
  // const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(
  //   WS_MESSAGE_TYPE.MESSAGE,
  // );

  // useEffect(() => {
  //   setTimeout(() => {
  //     flatListRef.current?.scrollToEnd({ animated: true });
  //     // TODO: какой-нибудь requestidleCallback для react-native прикрутить бы или на последнем рефе завязаться
  //   }, 1000);
  // }, [flatListRef]);

  useNewIncomingMessageChatHandler({ flatListRef });

  const handleSendMessage = () => {
    if (text.trim()) {
      // Создаем и отправляем ws-сообщение
      const newMessage = {
        type: WS_MESSAGE_TYPE.MESSAGE,
        payload: {
          timeStamp: Date.now(),
          text,
          senderId: currentUser?.id,
          chatId: currentUser?.chatWithAdminId,
          wasReadBy: [currentUser?.id],
        } as ChatMessage,
      };

      dispatch(wsSend(newMessage));
      setText(""); // Очистка TextArea после отправки сообщения
      //Обновить открытые сообщения
      setMessages([...chatMessages, newMessage.payload]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Chat
        ref={flatListRef}
        // isTyping={typingStatus?.code === "typingStarted"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              onFocus={() => {
                setTimeout(() => {
                  if (flatListRef.current) {
                    flatListRef.current.scrollToEnd({ animated: true });
                  }
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
              onPress={handleSendMessage}
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
    // width: '100%'
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
