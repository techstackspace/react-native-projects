import { ViewStyle } from "react-native";
import { ReactNode } from "react";
import Container from "../shared/Container";

const FixedTab = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) => {
  return <Container style={style}>{children}</Container>;
};

export default FixedTab;