import { useTranslation } from "react-i18next";
import { ChoppChip } from "./chopp-chip";
import { useChoppTheme } from "../context/chopp-theme-context";
import { ORDER_STATUS } from "../enums";

type Props = {
  status?: any;
  style?: Record<string, string | number>;
};

export const ChoppOrderStatusChip = ({
  style,
  status = "" as ORDER_STATUS,
}: Props) => {
  // const { theme } = useChoppTheme();
  // const { t } = useTranslation();

  // const COLORS: Record<
  // ORDER_STATUS,
  //   { backgroundColor: string; iconColor: string; iconName: string }
  // > = {
  //   [ORDER_STATUS.COMPLETED]: {
  //     backgroundColor: theme.colors.successContainer,
  //     iconColor: theme.colors.success,
  //     iconName: "checkmark-done-outline",
  //   },
  //   [ORDER_STATUS.ACCEPTED]: {
  //     backgroundColor: theme.colors.primaryContainer,
  //     iconColor: theme.colors.primary,
  //     iconName: "checkmark-outline",
  //   },
  //   [ORDER_STATUS.CANCELED]: {
  //     backgroundColor: theme.colors.errorContainer,
  //     iconColor: theme.colors.error,
  //     iconName: "close-circle-outline",
  //   },
  // };

  // return (
  //   <ChoppChip
  //     style={style}
  //     backgroundColor={COLORS[status]?.backgroundColor}
  //     iconColor={COLORS[status]?.iconColor}
  //     iconName={COLORS[status]?.iconName}
  //   >
  //     {t(status)}
  //   </ChoppChip>
  // );
};
