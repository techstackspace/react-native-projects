import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Container = ({ children, style }: ContainerProps) => {
  return (
    <>
      <SafeAreaView style={[styles.container, style]}>
        <View style={styles.contentView}>{children}</View>
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    width: "90%",
    marginInline: "auto",
    marginTop: -63,
  },
});

export default Container;