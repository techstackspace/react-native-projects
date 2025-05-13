import { GestureResponderEvent, ImageSourcePropType } from "react-native";

export interface GradientTabButtonProps {
  focused: boolean;
  icon: ImageSourcePropType;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}