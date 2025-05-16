import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";
import { constants } from "@/constants";
import { router } from "expo-router";

const Search = ({
  onChangeText,
  text,
}: {
  onChangeText: (text: string) => void;
  text: string;
}) => {
  const image = require("../../../assets/images/nav/search/search.png");

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search through 300+ movies online"
        placeholderTextColor={constants.light}
        onFocus={() => router.push("/(tabs)/Search")}
        returnKeyType="search"
      />
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: "relative",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get("screen").width * 0.9,
    backgroundColor: constants.secondary,
    borderRadius: 30,
    color: constants.light,
    paddingLeft: 40,
    borderColor: constants.secondary,
  },
  image: {
    position: "absolute",
    left: 15,
    top: 13,
    width: 16,
    height: 16,
  },
});

export default Search;