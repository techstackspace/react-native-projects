export interface MoviesHeaderProps {
  title: string
  genreList: string[]
  onMoviePress: (genre: string) => void
}
