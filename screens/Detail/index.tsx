import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Main from "@/components/shared/Main";
import MovieCover from "@/components/MovieCover";
import DetailContent from "@/components/DetailContent";
import { router, useLocalSearchParams } from "expo-router";
import { useMovie } from "@/hooks/useMovie";
import GradientTabButton from "@/components/GradientTabButton";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { loading } = useMovie(id as string);

  if (loading) {
    return <ActivityIndicator size="small" color="#fff" />;
  }
  return (
    <Main>
      <MovieCover />
      <ScrollView>
        <DetailContent />
      </ScrollView>
      <GradientTabButton
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
  button: {
    paddingVertical: 20,
  },
});