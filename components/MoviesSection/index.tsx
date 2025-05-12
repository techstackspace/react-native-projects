import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Item from "@/components/Top/item";
import { MoviesSectionInterface } from "@/components/MoviesSection/interface";
import { constants } from "@/constants";

interface MoviesSectionProps {
  title: string;
  movies: MoviesSectionInterface[];
  isTopMovies: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalMovies: number;
  loading: boolean;
  setCurrentLimit: React.Dispatch<React.SetStateAction<number>>;
}

const MoviesSection = ({
  title,
  movies,
  isTopMovies,
  totalMovies,
  setCurrentPage,
  loading,
  setCurrentLimit,
}: MoviesSectionProps) => {
  const loadMoreMovies = () => {
    if (!loading && movies.length < totalMovies) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLimitChange = (limit: number) => {
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
    <View style={styles.sectionContainer}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        {!isTopMovies && (
          <View style={styles.buttonContainer}>
            {[2, 4, 6, 8, 10].map((limit) => (
              <Pressable
                style={styles.button}
                key={limit}
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
          <Item
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
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.9,
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
    backgroundColor: constants.accent,
    borderRadius: 4,
    width: 25,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoviesSection;