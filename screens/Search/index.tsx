import { useEffect, useState } from 'react'
import Main from '@/components/shared/Main'
import Nav from '@/components/UI/Nav'
import MoviesSection from '@/components/UI/MoviesSection'
import { useMovies } from '@/hooks/useMovies'
import Alert from '@/components/UI/Alert'
import Navbar from '@/components/UI/Navbar'

const SearchScreen = () => {
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [genres, setGenres] = useState('')
  const [genreList, setGenreList] = useState<string[]>([])
  const search = text.replaceAll(' ', '')
  const latestMoviesUrl = `/api/movies?limit=${currentLimit}&genres=${genres}&page=${currentPage}&search=${search}`
  const genresUrl = '/api/movies/genres'

  const {
    movies: latestMovies,
    loading: latestLoading,
    sumMovies: totalMovies,
  } = useMovies(currentPage, latestMoviesUrl)
  const { movies: genresMovies } = useMovies(1, genresUrl)
  const isSearchEmpty = text.trim() === ''

  const onChangeText = (text: string) => {
    setCurrentPage(1)
    setCurrentLimit(10)
    setText(text)
  }

  useEffect(() => {
    if (Array.isArray(genresMovies)) {
      setGenreList(genresMovies as unknown as string[])
    }
  }, [genresMovies])

  const handleGenreText = (genre: string) => {
    setGenres(genre)
  }

  if (text.length > 0 && latestMovies.length === 0) {
    return (
      <Main>
        <Alert
          message={`No movies found for "${text}"`}
          name="note"
          onChangeText={onChangeText}
          text={text}
        />
      </Main>
    )
  }

  return (
    <Main>
      <Navbar />
      <Nav onChangeText={onChangeText} text={text} />
      {isSearchEmpty ? (
        <Alert
          message="Start typing to search for movies"
          name="question"
          onChangeText={onChangeText}
          text={text}
        />
      ) : (
        <MoviesSection
          title={text}
          genreList={genreList}
          onGenrePress={handleGenreText}
          movies={latestMovies}
          isTopMovies={false}
          setCurrentPage={setCurrentPage}
          setCurrentLimit={setCurrentLimit}
          totalMovies={totalMovies}
          loading={latestLoading}
        />
      )}
    </Main>
  )
}

export default SearchScreen
