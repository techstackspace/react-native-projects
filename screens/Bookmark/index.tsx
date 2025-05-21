import Main from '@/components/shared/Main'
import Navbar from '@/components/UI/Navbar'
import Alert from '@/components/UI/Alert'
import { MovieContext } from '@/context'
import { useContext, useState } from 'react'
import Header from '@/components/UI/Header'
import MoviesSection from '@/components/UI/MoviesSection'
import { useBookmarks } from '@/hooks/useBookmarks'
import { handleDeleteMovieBookmark, handleMovieBookmark } from '@/api'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'

const BookmarkScreen = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [text, setText] = useState('')
  const bookmarkMoviesUrl = `/api/users/bookmarks?limit=${currentLimit}&page=${currentPage}`

  const {
    bookmarks: bookmarkMovies,
    loading: bookmarkLoading,
    error: bookmarkError,
    sumMovies: totalBookmarks,
  } = useBookmarks(currentPage, bookmarkMoviesUrl)
  const { isLoggedIn } = useContext(MovieContext)
  if (bookmarkLoading) {
    return (
      <Main>
        <ActivityIndicator style={styles.loaderContainer} />
      </Main>
    )
  }

  const onChangeText = (text: string) => {
    setCurrentPage(1)
    setCurrentLimit(10)
    setText(text)
  }

  const sections = [{ key: 'bookmark-section' }]

  return (
    <Main>
      <Navbar />
      <Header onChangeText={onChangeText} text={text} />
      {!isLoggedIn ? (
        <Alert
          message="Start typing to search for movies"
          name="question"
          onChangeText={onChangeText}
          text={text}
        />
      ) : bookmarkMovies.length === 0 && !bookmarkLoading ? (
        <Alert name="book-open" message="Bookmark list is empty" />
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.key}
          renderItem={() => (
            <MoviesSection
              title={'Bookmark List'}
              onGenrePress={handleMovieBookmark}
              handleDeleteMovieBookmark={handleDeleteMovieBookmark}
              movies={bookmarkMovies}
              isTopMovies={false}
              totalMovies={totalBookmarks}
              loading={bookmarkLoading}
              setCurrentPage={setCurrentPage}
              setCurrentLimit={setCurrentLimit}
            />
          )}
        />
      )}
    </Main>
  )
}

export default BookmarkScreen

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
