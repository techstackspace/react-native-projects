import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Main from "@/components/shared/Main";
import Nav from "@/components/Nav";
import MoviesSection from "@/components/MoviesSection";
import { useMovies } from "@/hooks/useMovies";
import { SimpleLineIcons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [genres, setGenres] = useState("");
  const [genreList, setGenreList] = useState<string[]>([]);
  const search = text.replaceAll(" ", "");
  const latestMoviesUrl = `/api/movies?limit=${currentLimit}&genres=${genres}&page=${currentPage}&search=${search}`;
  const genresUrl = "/api/movies/genres";

  const {
    movies: latestMovies,
    loading: latestLoading,
    sumMovies: totalMovies,
  } = useMovies(currentPage, latestMoviesUrl);
  const { movies: genresMovies } = useMovies(1, genresUrl);
  const isSearchEmpty = text.trim() === "";

  const onChangeText = (text: string) => {
    setCurrentPage(1);
    setCurrentLimit(10);
    setText(text);
  };

  useEffect(() => {
    if (Array.isArray(genresMovies)) {
      setGenreList(genresMovies as unknown as string[]);
    }
  }, [genresMovies]);

  const handleGenreText = (genre: string) => {
    setGenres(genre);
  };

  if (text.length > 0 && latestMovies.length === 0) {
    return (
      <Main>
        <Nav onChangeText={onChangeText} text={text} />
        <View style={styles.emptyStateContainer}>
          <SimpleLineIcons name="note" size={100} color="#666" />
          <Text style={styles.emptyStateText}>
            No movies found for "{text}"
          </Text>
        </View>
      </Main>
    );
  }

  return (
    <Main>
      <Nav onChangeText={onChangeText} text={text} />
      {isSearchEmpty ? (
        <View style={styles.emptyStateContainer}>
          <SimpleLineIcons name="question" size={100} color="#666" />
          <Text style={styles.emptyStateText}>
            Start typing to search for movies
          </Text>
        </View>
      ) : (
        <MoviesSection
          title={text}
          genreList={genreList}
          onGenrePress={handleGenreText}
          movies={latestMovies}
          isTopMovies={false}
          setCurrentPage={setCurrentPage}
          setCurrentLimit={setCurrentLimit}
          totalMovies={totalMovies}
          loading={latestLoading}
        />
      )}
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

export default SearchScreen;
