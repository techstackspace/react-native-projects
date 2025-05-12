import { useEffect, useState } from "react";
import { handleFetchMovies } from "@/api";
import { MoviesSectionInterface } from "@/components/MoviesSection/interface";

export const useMovies = (page: number, url: string) => {
  const [movies, setMovies] = useState<MoviesSectionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sumMovies, setSumMovies] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => loadMovies(), 400);
    return () => clearTimeout(timeoutId);
  }, [page, url]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await handleFetchMovies(url);
      setMovies((prevMovies) =>
        page === 1 ? data.movies || data : [...prevMovies, ...data.movies]
      );
      setSumMovies(data.totalMovies);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, sumMovies };
};