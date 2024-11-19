import { useTranslation } from "react-i18next";

import { ChoppChip } from "./chopp-chip";
import { CALL_STATUS } from "../enums/call-status";
import { useChoppTheme } from "../context/chopp-theme-context";

type Props = {
  status?: CALL_STATUS;
  style?: Record<string, string | number>;
};

export const ChoppOrderStatusChip = ({ style, status = "" as CALL_STATUS }: Props) => {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();

  const COLORS: Record<
    CALL_STATUS,
    { backgroundColor: string; iconColor: string; iconName: string }
  > = {
    [CALL_STATUS.COMPLETED]: {
      backgroundColor: theme.colors.successContainer,
      iconColor: theme.colors.success,
      iconName: "checkmark-done-outline",
    },
    [CALL_STATUS.ACCEPTED]: {
      backgroundColor: theme.colors.primaryContainer,
      iconColor: theme.colors.primary,
      iconName: "checkmark-outline",
    },
    [CALL_STATUS.CANCELED]: {
      backgroundColor: theme.colors.errorContainer,
      iconColor: theme.colors.error,
      iconName: "close-circle-outline",
    },
  };

  return (
    <ChoppChip
      style={style}
      backgroundColor={COLORS[status]?.backgroundColor}
      iconColor={COLORS[status]?.iconColor}
      iconName={COLORS[status]?.iconName}
    >
      {t(status)}
    </ChoppChip>
  );
};
