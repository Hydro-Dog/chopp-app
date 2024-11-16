import { PropsWithChildren, useState } from "react";
import { Card, IconButton } from "react-native-paper";

export const ChoppCollapsibleCard = ({
  children,
  title,
  small,
  ...props
}: PropsWithChildren<
  typeof Card.Title & { small?: boolean; title?: string }
>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log("children: ", children);

  // TODO: добавить анимацию раскрытия
  return (
    <Card style={{ width: "100%", marginTop: 24 }}>
      <Card.Title
        title={title}
        style={small ? { minHeight: "auto" } : {}}
        right={(props) => (
          <IconButton
            {...props}
            animated
            icon={isExpanded ? "chevron-up" : "chevron-down"}
            onPress={() => setIsExpanded(!isExpanded)}
          />
        )}
        {...props}
      />
      {isExpanded && <Card.Content>{children}</Card.Content>}
    </Card>
  );
};
