import { StyleSheet, Text, View } from "react-native";
import Main from "../../shared/Main";
import { SimpleLineIcons } from "@expo/vector-icons";
import Nav from "../Nav";
import { useSegments } from "expo-router";

type SimpleLineIconNames = keyof typeof SimpleLineIcons.glyphMap;

interface AlertProps {
  message: string;
  text?: string;
  onChangeText?: (text: string) => void;
  name?: SimpleLineIconNames;
  size?: number;
  color?: string;
}

const Alert = ({
  message,
  name = "info",
  size = 100,
  color = "#666",
  text = "",
  onChangeText = () => {},
}: AlertProps) => {
  const segments = useSegments();
  const isDetailRoute = (segments as string[]).includes("Detail");

  return (
    <Main>
      {isDetailRoute ? null : <Nav onChangeText={onChangeText} text={text} />}
      <View style={styles.emptyStateContainer}>
        <SimpleLineIcons name={name} size={size} color={color} />
        <Text style={styles.emptyStateText}>{message}</Text>
      </View>
    </Main>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "Inter-bold",
  },
});

export default Alert;
