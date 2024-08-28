import React, { createContext, PropsWithChildren, useState } from "react";
import { View, Text } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { useChoppTheme } from "@/theme";

export const ChoppSnackbarContext = createContext<{
  push: (item: ChoppSnackbarProps) => void;
}>({
  push: function (item: ChoppSnackbarProps): void {
    throw new Error("Function not implemented.");
  },
});

enum VARIANTS {
  INFO = "info",
  ERROR = "error",
  WARN = "warn",
  SUCCESS = "success",
  DEFAULT = "default",
}

type ChoppSnackbarProps = {
  id: string;
  variant: VARIANTS;
  text: string;
  actionLabel: string;
  onPress?: () => void;
};
export const ChoppSnackbarStack = ({ children }: PropsWithChildren<object>) => {
  const theme = useChoppTheme();

  const [visible, setVisible] = useState(true);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [snackbarMessages, setSnackbarMessages] = useState<
    Record<string, ChoppSnackbarProps>
  >({});

  const [deletedSnackbars, setDeletedSnackbars] = useState(new Set());

  const pushSnackbar = (item: ChoppSnackbarProps) => {
    setSnackbarMessages((val) => ({ ...val, [item.id]: item }));
  };
  const popSnackbar = (itemId: string) => {
    setDeletedSnackbars(new Set([...deletedSnackbars, itemId]));

    setTimeout(() => {
      setSnackbarMessages((val) => {
        delete val[itemId];
        return val;
      });
    }, 1000);
  };

  const snackbarColors: Record<string, { background: string; color: string }> =
    {
      [VARIANTS.DEFAULT]: {
        background: theme.colors.primaryContainer,
        color: theme.colors.onPrimaryContainer,
      },
      [VARIANTS.INFO]: {
        background: theme.colors.secondaryContainer,
        color: theme.colors.onSecondaryContainer,
      },
      [VARIANTS.ERROR]: {
        background: theme.colors.errorContainer,
        color: theme.colors.onErrorContainer,
      },
      [VARIANTS.WARN]: {
        background: theme.colors.tertiaryContainer,
        color: theme.colors.onTertiaryContainer,
      },
      [VARIANTS.SUCCESS]: {
        background: theme.colors.successContainer,
        color: theme.colors.onSuccessContainer,
      },
    };

  return (
    <ChoppSnackbarContext.Provider value={{ push: pushSnackbar }}>
      {children}
      <View>
        <Button
          onPress={() => {
            pushSnackbar({
              id: String(Math.random()),
              variant: VARIANTS.DEFAULT,
              text: "jopa",
              actionLabel: "hyi",
            });
          }}
        >
          {visible ? "Hide" : "Show"}
        </Button>
        {Object.values(snackbarMessages)?.map((item, index) => {
          return (
            <Snackbar
              key={index}
              style={{
                backgroundColor: snackbarColors[item.variant].background,
                top: (index + 1) * -20,
                opacity: 0.95,
              }}
              visible={!deletedSnackbars.has(item.id)}
              onDismiss={onDismissSnackBar}
              action={{
                textColor: snackbarColors[item.variant].color,
                label: "╳",
                // icon: 'close',
                onPress: () => {
                  console.log("onPress: ", item.id);
                  popSnackbar(item.id);
                },
              }}
            >
              <Text style={{ color: snackbarColors[item.variant].color }}>
                {item.text}
              </Text>
            </Snackbar>
          );
        })}
      </View>
    </ChoppSnackbarContext.Provider>
  );
};
