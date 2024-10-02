import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useChoppTheme, WsMessage } from "@/shared"; // Убедитесь в правильном импорте темы

type Props = {
  messages?: WsMessage[];
};

const ChatHistory = ({ messages }: Props) => {
  const { theme } = useChoppTheme();

  return (
    <View style={styles.container}>
      {messages?.map((msg, index) => (
        <View
          key={index}
          style={[
            styles.messageContainer,
            msg.type === "userMessage"
              ? { backgroundColor: theme.colors.primary }
              : { backgroundColor: theme.colors.secondary },
          ]}
        >
          <Text style={styles.messageText}>{msg.message}</Text>
          <Text style={styles.timeText}>
            {new Date(msg.timeStamp).toLocaleTimeString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
});

export default ChatHistory;
