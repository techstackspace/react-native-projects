export interface MoviesInterface {
  _id?: string
  title: string
  description: string
  genres: string[]
  posterUrl: string
  rating: {
    average: number
    count: number
  }
  totalMovies?: number
  releaseDate?: string
  duration?: string
  revenue?: string
  status?: string
  countries?: string[]
  budget?: string
  tagline?: string
  trailerUrl?: string
  loadMovie: any
  productionCompanies?: string[]
  id?: string
  numbering?: number
  isTopMovies?: boolean
  movie?: any
  addBookmarkMovie: any
  deleteBookmarkMovie: (id: string) => void
}

export interface MoviesSectionProps {
  title: string
  movies: MoviesInterface[]
  isTopMovies: boolean
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>
  totalMovies: number
  loading: boolean
  setCurrentLimit?: React.Dispatch<React.SetStateAction<number>>
  genreList?: string[]
  onMoviePress?: (genre: string) => void
  addBookmarkMovie?: (id: string) => void
  currentLimit?: number
  currentPage?: number
  deleteBookmarkMovie: (id: string) => void
}
