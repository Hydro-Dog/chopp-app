import { PropsWithChildren, ReactElement, useState } from "react";
import { Card, IconButton } from "react-native-paper";

export const ChoppCollapsibleCard = ({
  children,
  title,
  small,
  ...props
}: PropsWithChildren<{
  small?: boolean;
  title?: ReactElement | string;
  left: (props: unknown) => React.JSX.Element;
}>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO: добавить анимацию раскрытия
  return (
    <Card style={{ width: "100%", marginTop: 24 }}>
      <Card.Title
        // @ts-ignore
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
