import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Movie from "@/components/Movie";
import { MoviesSectionProps } from "@/components/MoviesSection/interface";
import { constants } from "@/constants";
import { useSegments } from "expo-router";
import MoviesHeader from "../MoviesHeader";
import { useState } from "react";

const MoviesSection = ({
  title,
  movies,
  isTopMovies,
  totalMovies,
  setCurrentPage,
  loading,
  setCurrentLimit,
  genreList,
  onGenrePress = () => {},
}: MoviesSectionProps) => {
  const segments = useSegments();
  const isSearchRoute = (segments as string[]).includes("Search");
  const loadMoreMovies = () => {
    if (!loading && movies.length < totalMovies) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const [activeLimit, setActiveLimit] = useState(10);

  const handleLimitChange = (limit: number) => {
    setActiveLimit(limit);
    setCurrentLimit(limit);
    setCurrentPage(1);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  };

  return (
    <>
      {isSearchRoute ? (
        <MoviesHeader
          title={title || ""}
          genreList={genreList || []}
          onGenrePress={onGenrePress}
        />
      ) : null}
      <View style={styles.sectionContainer}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {!isSearchRoute && <Text style={styles.sectionTitle}>{title}</Text>}
          {!isTopMovies && !isSearchRoute && (
            <View style={styles.buttonContainer}>
              {[2, 4, 6, 8, 10].map((limit) => (
                <Pressable
                  key={limit}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        limit === activeLimit
                          ? constants.accent
                          : constants.dark,
                    },
                  ]}
                  onPress={() => handleLimitChange(limit)}
                >
                  <Text style={{ color: constants.white }}>{limit}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        <FlatList
          data={movies}
          horizontal={isTopMovies}
          numColumns={isTopMovies ? 0 : 3}
          keyExtractor={(movie, index) => `${movie._id}-${index}`}
          renderItem={({ item, index }) => (
            <Movie
              id={item._id}
              title={item.title}
              description={item.description}
              genres={item.genres}
              posterUrl={item.posterUrl}
              numbering={index + 1}
              isTopMovies={isTopMovies}
              rating={item.rating}
            />
          )}
          showsHorizontalScrollIndicator={isTopMovies}
          nestedScrollEnabled
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    width: Dimensions.get("screen").width * 0.9,
    marginHorizontal: "auto",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: constants.white,
    marginBottom: 10,
    fontFamily: "Inter-regular",
  },
  footer: {
    alignItems: "center",
    position: "relative",
    top: -15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: constants.light,
    borderRadius: 4,
    width: 25,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoviesSection;
