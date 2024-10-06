import React, { forwardRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ChoppThemedText, useChoppTheme, WsMessage } from "@/shared"; // Убедитесь в правильном импорте темы

type Props = {
  messages?: WsMessage[];
  isTyping?: boolean;
};

export const ChatHistory = forwardRef<FlatList<WsMessage>, Props>(
  ({ messages, isTyping }, ref) => {
    const { theme } = useChoppTheme();
    const [dots, setDots] = useState("");

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

    return (
      <FlatList
        ref={ref}
        data={messages}
        ListFooterComponent={
          isTyping ? (
            <ChoppThemedText style={{ width: "100px" }}>
              Печатает{dots}
            </ChoppThemedText>
          ) : (
            <></>
          )
        }
        ListFooterComponentStyle={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
        renderItem={({ item: msg }) => (
          <View
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
