import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Main from "@/components/shared/Main";
import MovieCover from "@/components/MovieCover";
import DetailContent from "@/components/DetailContent";
import { router, useLocalSearchParams, useSegments } from "expo-router";
import { useMovie } from "@/hooks/useMovie";
import GradientButton from "@/components/GradientButton";
import Alert from "@/components/Alert";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { movie, loading, error } = useMovie(id as string);

  if (loading) {
    return (
      <Main style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#fff" />
      </Main>
    );
  }
  if (!movie || error) {
    const message = error
      ? "There was an error loading the movie detail"
      : "No movie detail found";

    return <Alert message={message} />;
  }

  return (
    <Main>
      <MovieCover />
      <ScrollView>
        <DetailContent />
      </ScrollView>
      <GradientButton
        style={styles.button}
        onPress={() => router.push("/")}
        icon={require("@/assets/images/arrow-right.png")}
        label="Visit Home Page"
        focused={true}
      />
    </Main>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 20,
  },
});
