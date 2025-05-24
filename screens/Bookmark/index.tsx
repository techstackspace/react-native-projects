import Main from '@/components/shared/Main'
import Navbar from '@/components/UI/Navbar'
import Alert from '@/components/UI/Alert'
import { MovieContext } from '@/context'
import { useContext, useEffect, useState } from 'react'
import Header from '@/components/UI/Header'
import MoviesSection from '@/components/UI/MoviesSection'
import { useBookmarks } from '@/hooks/useBookmarks'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import AlertResponse from '@/components/UI/AlertResponse'
import { handleDeleteMovieBookmark } from '@/api'
import { useSegments } from 'expo-router'

const BookmarkScreen = () => {
  const segments = useSegments() as string[]

  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [deletedBookmark, setDeletedBookmark] = useState(null)
  const [deletedBookmarkMessage, setDeletedBookmarkMessage] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const bookmarkMoviesUrl = `/api/users/bookmarks?limit=${currentLimit}&page=${currentPage}`
  const isBookmark = segments.includes('Bookmark')

  const {
    bookmarks: bookmarkMovies,
    loading: bookmarkLoading,
    error: bookmarkError,
    sumMovies: totalBookmarks,
  } = useBookmarks(currentPage, bookmarkMoviesUrl, isBookmark)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeletedBookmarkMessage(null)
    }, 3000)
    return () => clearTimeout(timer)
  }, [deletedBookmarkMessage])

  const { isLoggedIn } = useContext(MovieContext)
  const deleteBookmarkMovie = async (id: string) => {
    try {
      const { deletedBookmark, updateBookmarks } =
        await handleDeleteMovieBookmark(id)
      setDeletedBookmarkMessage(deletedBookmark.message)
      setDeletedBookmark(updateBookmarks.bookmarks)
      setIsDeleted(true)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

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
      {error && <AlertResponse message={error} />}
      {deletedBookmarkMessage && (
        <AlertResponse message={deletedBookmarkMessage} />
      )}
      {bookmarkError && <AlertResponse message={bookmarkError} />}
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
              movies={isDeleted ? (deletedBookmark as any) : bookmarkMovies}
              deleteBookmarkMovie={deleteBookmarkMovie}
              isTopMovies={false}
              totalMovies={totalBookmarks}
              loading={bookmarkLoading}
              setCurrentPage={setCurrentPage}
              setCurrentLimit={setCurrentLimit}
              currentLimit={currentLimit}
              currentPage={currentPage}
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
