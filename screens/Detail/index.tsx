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
import { router, useLocalSearchParams } from "expo-router";
import { useMovie } from "@/hooks/useMovie";
import GradientButton from "@/components/GradientButton";
import { SimpleLineIcons } from "@expo/vector-icons";

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

    return (
      <Main>
        <View style={styles.emptyStateContainer}>
          <SimpleLineIcons name="info" size={100} color="#666" />
          <Text style={styles.emptyStateText}>{message}</Text>
        </View>
      </Main>
    );
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
