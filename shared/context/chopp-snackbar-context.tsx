import React, { createContext, PropsWithChildren, useState } from "react";
import { Text, View } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { SnackbarProvider } from "react-native-paper-snackbar-stack";
import { useChoppTheme } from "@/theme";

export const ChoppSnackbarContext = createContext<{
  push: (item: ChoppSnackbarProps) => void;
}>({
  push: (item: ChoppSnackbarProps) => {
    throw new Error("Function not implemented.");
  },
});

export enum SNACKBAR_VARIANTS {
  INFO = "info",
  ERROR = "error",
  WARN = "warn",
  SUCCESS = "success",
  DEFAULT = "default",
}

type ChoppSnackbarProps = {
  id: string;
  variant: SNACKBAR_VARIANTS;
  text: string;
  actionLabel: string;
  onPress?: () => void;
};
export const ChoppSnackbarStackWrapper = ({
  children,
}: PropsWithChildren<object>) => {
  const theme = useChoppTheme();

  const [visible, setVisible] = useState(true);

  //   const onToggleSnackBar = () => setVisible(!visible);

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

    // setTimeout(() => {
    //   setSnackbarMessages((val) => {
    //     delete val[itemId];
    //     return val;
    //   });
    // }, 1000);
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
    <SnackbarProvider maxSnack={4}>{children}</SnackbarProvider>
  );

//   return (
//     <ChoppSnackbarContext.Provider value={{ push: pushSnackbar }}>
//       {children}
//       <View>
//         <Button
//           onPress={() => {
//             pushSnackbar({
//               id: String(Math.random()),
//               variant: SNACKBAR_VARIANTS.ERROR,
//               text: "jopa",
//               actionLabel: "hyi",
//             });
//           }}
//         >
//           {visible ? "Hide" : "Show"}
//         </Button>
//         {Object.values(snackbarMessages)?.map((item, index) => {
//           return (
//             <Snackbar
//               key={index}
//               style={{
//                 backgroundColor: snackbarColors[item.variant].background,
//                 top: (index + 1) * -20,
//                 opacity: 0.95,
//               }}
//               visible={!deletedSnackbars.has(item.id)}
//               onDismiss={onDismissSnackBar}
//               action={{
//                 textColor: snackbarColors[item.variant].color,
//                 label: "╳",
//                 // icon: 'close',
//                 onPress: () => {
//                   console.log("onPress: ", item.id);
//                   popSnackbar(item.id);
//                 },
//               }}
//             >
//               <Text style={{ color: snackbarColors[item.variant].color }}>
//                 {item.text}
//               </Text>
//             </Snackbar>
//           );
//         })}
//       </View>
//     </ChoppSnackbarContext.Provider>
//   );
};
