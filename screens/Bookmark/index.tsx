import { StyleSheet, Text, View } from "react-native";
import Main from "@/components/shared/Main";
import { constants } from "@/constants";

const BookmarkScreen = () => {
  return (
    <Main>
      <View style={styles.container}>
        <Text style={{ color: constants.white }}>Bookmark</Text>
      </View>
    </Main>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});