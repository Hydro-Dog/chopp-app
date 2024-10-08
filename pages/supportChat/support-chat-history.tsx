import React, { forwardRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { ChoppThemedText, useChoppTheme, WsMessage } from "@/shared"; // Убедитесь в правильном импорте темы

type Props = {
  messages?: WsMessage[];
  isTyping?: boolean;
};

export const ChatHistory = forwardRef<FlatList<WsMessage>, Props>(
  ({ messages, isTyping }, ref) => {
    const { theme } = useChoppTheme();
    const [dots, setDots] = useState("");
    const fadeAnim = useState(() => new Animated.Value(0))[0];

    useEffect(() => {
      if (isTyping) {
        const interval = setInterval(() => {
          setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(interval);
      } else {
        setDots("");
      }
    }, [isTyping]);

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [messages]);

    return (
      <FlatList
        ref={ref}
        data={messages}
        ListFooterComponent={
          isTyping ? <ChoppThemedText>Печатает{dots}</ChoppThemedText> : <></>
        }
        ListFooterComponentStyle={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          marginRight: 16,
        }}
        renderItem={({ item: msg }) => (
          <Animated.View
            style={{
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
                msg.payload?.sender === "support"
                  ? {
                      alignSelf: "flex-start",
                      marginRight: 40,
                      backgroundColor: theme.colors.primary,
                    }
                  : {
                      alignSelf: "flex-end",
                      marginLeft: 40,
                      backgroundColor: theme.colors.secondary,
                    },
              ]}
            >
              <ChoppThemedText style={styles.messageText}>
                {msg.message}
              </ChoppThemedText>
            </View>
            <ChoppThemedText
              style={{
                ...styles.timeText,
                alignSelf:
                  msg.payload?.sender === "support" ? "flex-start" : "flex-end",
              }}
            >
              {new Date(msg.timeStamp).toLocaleTimeString()}
            </ChoppThemedText>
          </Animated.View>
        )}
        keyExtractor={(item) => item.timestamp}
      />
    );
  }
);

ChatHistory.displayName = "ChatHistory";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
