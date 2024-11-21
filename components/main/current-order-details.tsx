import * as React from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "react-native-paper";
import { ChoppCollapsibleCard } from "@/shared/components/chopp-collapsible-card";
import { ChoppViewItems } from "@/shared/components/chopp-view-items";
import { Order } from "@/store/slices/order-slice";

type Props = {
  order: Order;
};

export const CurrentOrderDetails = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
    <ChoppCollapsibleCard
      title={t("order")}
      left={(props: any) => (
        <Avatar.Icon
          {...props}
          style={{ transform: [{ rotate: "45deg" }] }}
          icon="rocket-outline"
        />
      )}
    >
      <ChoppViewItems
        items={{
          [t("orderAddress")]: "order.address",
          [t("orderComment")]: "order.orderComment",
        }}
      />
    </ChoppCollapsibleCard>
  );
};
