import { Image, ImageBackground, StyleSheet } from "react-native";
import Search from "../Search";

const iconCover = require("../../../assets/images/nav/Container.png");
const icon = require("../../../assets/images/nav/icon.png");

const Nav = ({
  onChangeText,
  text,
}: {
  onChangeText: (text: string) => void;
  text: string;
}) => {
  return (
    <ImageBackground
      source={iconCover}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <Image source={icon} style={styles.image} />
      <Search onChangeText={onChangeText} text={text} />
    </ImageBackground>
  );
};

export default Nav;

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    height: 200,
  },
  image: {
    width: 58.9,
    height: 43,
  },
});