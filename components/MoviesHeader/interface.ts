export interface MoviesHeaderProps {
  title: string;
  genreList: string[];
  onGenrePress: (genre: string) => void;
}