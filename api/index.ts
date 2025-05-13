import { Platform } from "react-native";

const HOST =
  Platform.OS === "android"
    ? "http://192.168.0.167:4000"
    : "http://localhost:4000";

const handleFetchMovies = async (url: string) => {
  try {
    const response = await fetch(`${HOST}${url}`);

    if (!response.ok) {
      throw new Error(
        `Unable to fetch top movies collections. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const handleFetchMoviesById = async (id: string) => {
  try {
    const response = await fetch(`${HOST}/api/movies/${id}`);

    if (!response.ok) {
      throw new Error(
        `Unable to fetch movie with the id of ${id}. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export { handleFetchMovies, handleFetchMoviesById };