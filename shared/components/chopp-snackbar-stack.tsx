import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
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

enum SNACKBAR_VARIANTS {
  INFO = "info",
  ERROR = "error",
  WARN = "warn",
  SUCCESS = "success",
  DEFAULT = "default",
}

export const useChoppSnackbar = () => useContext(ChoppSnackbarContext);

type ChoppSnackbarProps = {
  id: string;
  variant: SNACKBAR_VARIANTS;
  text: string;
  actionLabel?: string;
  duration?: number;
  onActionPress?: (value: ChoppSnackbarProps) => void;
};

//TODO: Добиться плавного исчезновения снакбаров для нативности
export const ChoppSnackbarStack = ({ children }: PropsWithChildren<object>) => {
  const theme = useChoppTheme();
  const [visible, setVisible] = useState(true);
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
      [SNACKBAR_VARIANTS.DEFAULT]: {
        background: theme.colors.primaryContainer,
        color: theme.colors.onPrimaryContainer,
      },
      [SNACKBAR_VARIANTS.INFO]: {
        background: theme.colors.secondaryContainer,
        color: theme.colors.onSecondaryContainer,
      },
      [SNACKBAR_VARIANTS.ERROR]: {
        background: theme.colors.errorContainer,
        color: theme.colors.onErrorContainer,
      },
      [SNACKBAR_VARIANTS.WARN]: {
        background: theme.colors.tertiaryContainer,
        color: theme.colors.onTertiaryContainer,
      },
      [SNACKBAR_VARIANTS.SUCCESS]: {
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
              variant: SNACKBAR_VARIANTS.DEFAULT,
              text: "jopa",
              actionLabel: "hyi2",
            });
          }}
        >
          {visible ? "Hide" : "Show"}
        </Button>
        {Object.values(snackbarMessages)?.map((item, index) => {
          return (
            <Snackbar
              duration={item.duration || 3000}
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
                label: item?.actionLabel || "╳",
                // icon: 'close',
                onPress: () => {
                  if (item?.onActionPress) {
                    item.onActionPress(item);
                  } else {
                    popSnackbar(item.id);
                  }
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
