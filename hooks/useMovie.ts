import { useEffect, useState } from "react";
import { handleFetchMovies } from "@/api";
import { MoviesInterface } from "@/components/MoviesSection/interface";

export const useMovie = (movieId: string) => {
  const [movie, setMovie] = useState<MoviesInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await handleFetchMovies(`/api/movies/${movieId}`);
        setMovie(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      loadMovie();
    }
  }, [movieId]);

  return { movie, loading, error };
};