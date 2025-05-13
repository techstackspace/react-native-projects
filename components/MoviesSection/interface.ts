export interface MoviesInterface {
  _id: string;
  title: string;
  description: string;
  genres: string[];
  posterUrl: string;
  rating: {
    average: number;
    count: number;
  };
  totalMovies?: number;
}

export interface MoviesSectionProps {
  title: string;
  movies: MoviesInterface[];
  isTopMovies: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalMovies: number;
  loading: boolean;
  setCurrentLimit: React.Dispatch<React.SetStateAction<number>>;
  genreList?: string[];
  onGenrePress?: (genre: string) => void
}