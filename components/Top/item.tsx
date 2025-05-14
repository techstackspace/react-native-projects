import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { constants } from "@/constants";
import { useMovie } from "@/hooks/useMovie";
import { Link } from "expo-router";

const Item = ({
  title,
  id,
  posterUrl,
  genres,
  numbering,
  isTopMovies,
  rating,
}: {
  title: string;
  description: string;
  id: string;
  posterUrl: string;
  genres: string[];
  numbering: number;
  isTopMovies: boolean;
  rating: {
    average: number;
    count: number;
  };
}) => {
  return (
    <View
      style={[
        styles.itemContainer,
        {
          marginLeft: isTopMovies ? 10 : 0,
        },
      ]}
      key={id}
    >
      <View>
        <Link href={`/Detail/${id}`}>
          <Image
            style={[
              styles.posterImage,
              {
                width: isTopMovies
                  ? 116
                  : Dimensions.get("screen").width < 420
                  ? 101
                  : 122,
              },
              {
                height: isTopMovies
                  ? 167
                  : Dimensions.get("screen").width < 420
                  ? 151
                  : 151,
              },
            ]}
            resizeMode="cover"
            source={{ uri: posterUrl }}
          />
        </Link>
        {isTopMovies ? (
          <MaskedView
            style={{ width: 50, height: 50, marginTop: -47, marginLeft: -23 }}
            maskElement={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.numberingText}>{numbering}</Text>
              </View>
            }
          >
            <LinearGradient
              colors={["#FAF9F7", "#9B9EA7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
        ) : null}
        <Text style={styles.title}>
          {title.length > 15 ? `${title.substring(0, 15)}...` : title}
        </Text>
        {!isTopMovies ? (
          <View style={styles.rating}>
            <Image
              source={require("../../assets/images/Rating.png")}
              style={styles.ratingImg}
            />
            <Text style={styles.ratingText}>{rating.average.toFixed(2)}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.genre}>
        {genres[0].length > 5 ? `${genres[0].substring(0, 5)}...` : genres[0]}
        <Text style={{ fontSize: 20 }}> . </Text>
        Movie
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    position: "relative",
  },
  posterImage: {
    width: 116,
    height: 167,
    borderRadius: 4,
  },
  title: {
    marginTop: 5,
    fontFamily: "Inter-bold",
    fontSize: 12,
    fontWeight: 900,
    color: constants.white,
  },
  genre: {
    fontSize: 10,
    color: "#9CA4AB",
    fontWeight: 700,
    fontFamily: "Inter-bold",
  },
  rating: {
    flexDirection: "row",
    gap: 4,
  },
  ratingImg: {
    width: 10,
    height: 10,
    position: "relative",
    top: 7,
  },
  ratingText: {
    fontSize: 10,
    color: constants.white,
    position: "relative",
    top: 5,
    fontWeight: 900,
    fontFamily: "Inter-bold",
  },
  numberingText: {
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: "Inter-bold",
    fontSize: 44,
    fontWeight: "900",
    textAlign: "center",
    color: "black",
  },
});

export default Item;