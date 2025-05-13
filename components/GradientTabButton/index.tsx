import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { constants } from "@/constants";
import { usePathname } from "expo-router";
import { GradientTabButtonProps } from "./interface";

const GradientTabButton = ({
  focused,
  icon,
  label,
  onPress,
}: GradientTabButtonProps) => {
  const pathname = usePathname();

  if (focused) {
    return (
      <Pressable onPress={onPress} style={styles.focusedContainer}>
        <LinearGradient
          colors={[constants.info, constants.accent]}
          start={[0, 0]}
          end={[1, 1]}
          style={[
            styles.gradientButton,
            { marginRight: pathname === "/Profile" ? -44 : 0 },
            { marginLeft: pathname === "/" ? -44 : 0 },
            {
              flexDirection:
                Dimensions.get("screen").width < 420 ? "column" : "row",
            },
            { width: Dimensions.get("screen").width < 420 ? 90 : 100 },
          ]}
        >
          <Image source={icon} style={styles.icon} />
          <Text
            style={[
              styles.label,
              { fontSize: Dimensions.get("screen").width < 420 ? 10 : 14 },
            ]}
          >
            {label}
          </Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.defaultButton}>
      <Image source={icon} style={styles.inactiveIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  focusedContainer: {
    alignItems: "center",
  },
  gradientButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    height: 48,
  },
  defaultButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
    tintColor: "#000",
  },
  inactiveIcon: {
    width: 20,
    height: 20,
    tintColor: constants.light,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    color: constants.dark,
  },
});

export default GradientTabButton;
