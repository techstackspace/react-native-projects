import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useState } from "react";
import FixedTab from ".";
import { constants } from "@/constants";
import { useMovies } from "@/hooks/useMovies";
import { LinearGradient } from "expo-linear-gradient";

const TabBody = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { width } = useWindowDimensions();
  const topMoviesUrl = "/api/movies/top";
  const latestMoviesUrl = `/api/movies`;

  const handleTabSelection = (tabText: string) => {
    setActiveTab(tabText);
  };

  const tabText = [
    styles.tabText,
    {
      fontSize: Dimensions.get("screen").width < 420 ? 10 : 14,
    },
  ];

  const { movies: topMovies } = useMovies(1, topMoviesUrl);
  const { movies: latestMovies } = useMovies(1, latestMoviesUrl);

  const tabs = [
    {
      name: "home",
      label: "Home",
      activeImg: require("../../assets/images/tab/active/home.png"),
      inactiveImg: require("../../assets/images/tab/inactive/home.png"),
    },
    {
      name: "search",
      label: "Search",
      activeImg: require("../../assets/images/tab/active/search.png"),
      inactiveImg: require("../../assets/images/tab/inactive/search.png"),
    },
    {
      name: "bookmark",
      label: "Save",
      activeImg: require("../../assets/images/tab/active/bookmark.png"),
      inactiveImg: require("../../assets/images/tab/inactive/bookmark.png"),
    },
    {
      name: "profile",
      label: "Profile",
      activeImg: require("../../assets/images/tab/active/profile.png"),
      inactiveImg: require("../../assets/images/tab/inactive/profile.png"),
    },
  ];

  return (
    topMovies.length > 0 &&
    latestMovies.length > 0 && (
      <FixedTab style={{ width: width * 0.9 }}>
        <View style={styles.tabButtons}>
          {tabs.map(({ name, label, activeImg, inactiveImg }) => (
            <Pressable
              key={name}
              onPress={() => handleTabSelection(name)}
              style={[
                styles.button,
                {
                  flexDirection:
                    Dimensions.get("screen").width < 420 ? "column" : "row",
                },
                { marginLeft: activeTab === "home" ? -30 : 0 },
                { marginRight: activeTab === "profile" ? -30 : 0 },
              ]}
            >
              {activeTab === name ? (
                <LinearGradient
                  colors={[constants.info, constants.accent]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[styles.activeTab, { flexDirection: "row" }]}
                >
                  <Image style={styles.buttonImage} source={activeImg} />
                  <Text style={tabText}>{label}</Text>
                </LinearGradient>
              ) : (
                <Image style={styles.buttonImage} source={inactiveImg} />
              )}
            </Pressable>
          ))}
        </View>
      </FixedTab>
    )
  );
};

export default TabBody;

const styles = StyleSheet.create({
  tabButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: constants.secondary,
    position: "absolute",
    bottom: Platform.OS === 'android' ? 0 : 30,
    height: 48,
    borderRadius: 70,
    paddingHorizontal: 30,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  activeTab: {
    borderRadius: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    height: "100%",
    gap: 5,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  tabText: {
    color: constants.dark,
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "Inter-bold",
  },
});