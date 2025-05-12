import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { constants } from "@/constants";
import { StatusBar } from "expo-status-bar";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <LinearGradient
      colors={["#000957", constants.primary]}
      locations={[0, 0.2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.mainContent}
    >
      {children}
      <StatusBar style="light" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Main;