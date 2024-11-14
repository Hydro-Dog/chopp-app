import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";
import { Card } from "react-native-paper";
import { ChoppViewItem } from "@/shared";
import { Order } from "@/store/slices/order-slice";

type Props = {
  order: Order;
};

export const CurrentOrderDetails = ({ order }: Props) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card style={{ width: "100%", marginTop: 24 }}>
      <Card.Title
        title={t("order")}
        subtitle={
          order?.createdAt
            ? `${t("orderCreationDate")}: ${new Date(order.createdAt).toLocaleTimeString()}`
            : undefined
        }
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => (
          <IconButton
            {...props}
            animated
            icon={isExpanded ? "chevron-down" : "chevron-up"}
            onPress={() => setIsExpanded(!isExpanded)}
          />
        )}
      />
      {isExpanded && (
        <Card.Content>
          <Text
            variant="bodyMedium"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxHeight: 120,
              overflow: "scroll",
            }}
          >
            <ChoppViewItem
              title={t("orderAddress")}
              label="jopa asd asd as da sd as d
          asdasjdoj ojasojd ojasojdoasj oj"
            />
            <ChoppViewItem
              title={t("orderComment")}
              label="hyi asdasd ini in  awiufw sf hyi asdasd ini in  awiufw sf hyi asdasd ini in  awiufw sf hyi asdasd ini in  awiufw sf hyi asdasd ini in  awiufw sf hyi asdasd ini in  awiufw sf hyi asdasd ini in  awiufw sf hyi asdasd ini in  awiufw sf"
            />
          </Text>
        </Card.Content>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  surface: {
    margin: 8,
    padding: 8,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
