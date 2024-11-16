import { useState } from "react";
import { Card, Avatar, IconButton } from "react-native-paper";
import { t } from "i18next";
import { ChoppThemedText } from "./chopp-themed-text";
import { ChoppViewItem } from "./chopp-view-item";

type Props = {};

export const ChoppCollapsibleCard = ({
  children,
  ...props
}: typeof Card.Title) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card style={{ width: "100%", marginTop: 24 }}>
      <Card.Title right={(props) => (
          <IconButton
            {...props}
            animated
            icon={isExpanded ? "chevron-down" : "chevron-up"}
            onPress={() => setIsExpanded(!isExpanded)}
          />
        )} {...props} />
      {isExpanded && <Card.Content>{children}</Card.Content>}
    </Card>
  );
};
