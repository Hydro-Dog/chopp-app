import React, { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { ChoppThemedText, useChoppTheme, WsMessage } from "@/shared";

type Props = {
  messages?: WsMessage[];
  isTyping?: boolean;
};

export const SupportChat = forwardRef<FlatList<WsMessage>, Props>(
  ({ messages, isTyping }, ref) => {
    const { theme } = useChoppTheme();
    const [dots, setDots] = useState("");
    const fadeAnim = useState(() => new Animated.Value(0))[0];
    const { t } = useTranslation();

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
          isTyping ? (
            <ChoppThemedText>
              {t("typing")}
              {dots}
            </ChoppThemedText>
          ) : (
            <></>
          )
        }
        ListFooterComponentStyle={styles.listFooter}
        renderItem={({ item: msg }) => (
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
  },
);

SupportChat.displayName = "SupportChat";

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
