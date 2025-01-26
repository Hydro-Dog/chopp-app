import React, { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { useSelector } from "react-redux";
import { ChoppThemedText } from "@/shared/components/chopp-themed-text";
import { useChatsContext } from "@/shared/context/chats-context";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";
import { ChatMessage } from "@/shared/types/chat-message";
import { RootState } from "@/store/store";

type Props = {
  // messages?: WsMessage[];
  // isTyping?: boolean;
};

export const Chat = forwardRef<FlatList<ChatMessage>, Props>((_, ref) => {
  const { chatMessages } = useChatsContext();
  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { theme } = useChoppTheme();
  // const [dots, setDots] = useState("");
  const fadeAnim = useState(() => new Animated.Value(0))[0];
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (isTyping) {
  //     const interval = setInterval(() => {
  //       setDots((prev) => (prev.length < 3 ? prev + "." : ""));
  //     }, 500);
  //     return () => clearInterval(interval);
  //   } else {
  //     setDots("");
  //   }
  // }, [isTyping]);

  // useEffect(() => {
  //   if (chatMessages) {
  //     setMessages(chatMessages);
  //   }
  // }, [chatMessages]);

  // console.log("messages: ", messages);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [chatMessages]);

  return (
    <FlatList
      ref={ref}
      data={chatMessages}
      //   onEndReached={handleReachEnd}
      // onEndReachedThreshold={0.5}  // Вызывается когда пользователь достигает 50% конца списка

      // ListFooterComponent={
      //   isTyping ? (
      //     <ChoppThemedText>
      //       {t("typing")}
      //       {dots}
      //     </ChoppThemedText>
      //   ) : (
      //     <></>
      //   )
      // }
      ListFooterComponentStyle={styles.listFooter}
      renderItem={({ item }) => (
        <Animated.View
          style={{
            paddingHorizontal: 8,
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
          }}
        >
          <View
            style={[
              styles.messageContainer,
              item?.senderId === currentUser?.id
                ? {
                    alignSelf: "flex-end",
                    marginLeft: 40,
                    backgroundColor: theme.colors.secondary,
                  }
                : {
                    alignSelf: "flex-start",
                    marginRight: 40,
                    backgroundColor: theme.colors.primary,
                  },
            ]}
          >
            <ChoppThemedText style={styles.messageText}>
              {item?.text}
            </ChoppThemedText>
          </View>
          <ChoppThemedText
            style={{
              ...styles.timeText,
              alignSelf:
                item?.senderId === currentUser?.id ? "flex-end" : "flex-start",
            }}
          >
            {!!item?.timeStamp && new Date(item.timeStamp).toLocaleTimeString()}
          </ChoppThemedText>
        </Animated.View>
      )}
      keyExtractor={(item) => item?.messageId}
    />
  );
});

Chat.displayName = "SupportChat";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listFooter: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 16,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 8,
  },
  messageText: {
    color: "white",
  },
  timeText: {
    marginHorizontal: 10,
    marginBottom: 8,
    fontSize: 12,
  },
});
