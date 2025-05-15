import {
  GestureResponderEvent,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";

export interface GradientTabButtonProps {
  focused: boolean;
  icon: ImageSourcePropType;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
}