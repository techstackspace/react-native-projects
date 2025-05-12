import { useState } from "react";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import Nav from "@/components/Nav";
import MoviesSection from "@/components/MoviesSection";
import { useMovies } from "@/hooks/useMovies";
import { StatusBar } from "expo-status-bar";
import { ItemSectionsProps } from "./interface";

const Home = () => {
  const [text, setText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const topMoviesUrl = "/api/movies/top";
  const latestMoviesUrl = `/api/movies?limit=${currentLimit}&page=${currentPage}&search=${text}`;

  const { movies: topMovies, loading: topLoading } = useMovies(1, topMoviesUrl);
  const {
    movies: latestMovies,
    loading: latestLoading,
    sumMovies: totalMovies,
  } = useMovies(currentPage, latestMoviesUrl);

  const sections = [
    { type: "nav" },
    { type: "topMovies", title: "Popular Movies", data: topMovies },
    { type: "latestMovies", title: "Latest Movies", data: latestMovies },
  ];

  const renderItem = ({ item }: { item: ItemSectionsProps }) => {
    if (item.type === "nav") {
      return <Nav onChangeText={setText} text={text} />;
    }

    return (
      <MoviesSection
        title={item.title || ""}
        movies={item.data || []}
        isTopMovies={item.type === "topMovies"}
        setCurrentPage={setCurrentPage}
        setCurrentLimit={setCurrentLimit}
        totalMovies={totalMovies}
        loading={latestLoading}
      />
    );
  };

  const isInitialLoading = (topLoading || latestLoading) && totalMovies <= 1;

  if (isInitialLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <StatusBar style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;