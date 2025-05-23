import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import Movie from '@/components/UI/Movie'
import { MoviesSectionProps } from '@/components/UI/MoviesSection/interface'
import { constants } from '@/constants'
import { useSegments } from 'expo-router'
import MoviesHeader from '../MoviesHeader'
import { useState } from 'react'
import { handlAddMovieBookmark, handleDeleteMovieBookmark } from '@/api'
import AlertResponse from '@/components/UI/AlertResponse'

const MoviesSection = ({
  title,
  movies,
  isTopMovies,
  totalMovies,
  setCurrentPage,
  loading,
  setCurrentLimit,
  genreList,
  onMoviePress = () => {},
}: MoviesSectionProps) => {
  const segments = useSegments()
  const isSearchRoute = (segments as string[]).includes('Search')
  const isBookmarkRoute = (segments as string[]).includes('Bookmark')
  const loadMoreMovies = () => {
    if (!loading && movies.length < totalMovies && setCurrentPage) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const [activeLimit, setActiveLimit] = useState(10)

  const handleLimitChange = (limit: number) => {
    setActiveLimit(limit)
    if (setCurrentLimit) setCurrentLimit(limit)
    if (setCurrentPage) setCurrentPage(1)
  }

  const renderFooter = () => {
    if (!loading) return null
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={constants.white} />
      </View>
    )
  }

  const [addedBookmark, setAddedBookmark] = useState(null)
  const [addedMessage, setAddedMessage] = useState(null)
  const [deletedBookmarkMessage, setDeletedBookmarkMessage] = useState(null)
  const [isAdded, setIsAdded] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [deletedBookmark, setDeletedBookmark] = useState()
  const [error, setError] = useState<string | null>(null)

  const addBookmarkMovie = async (id: string) => {
    try {
      const { addedBookmark, updateBookmarks } = await handlAddMovieBookmark(id)
      setAddedBookmark(updateBookmarks.bookmarks)
      setAddedMessage(addedBookmark.message)
      setIsAdded(true)
      setIsDeleted(false)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  const deleteBookmarkMovie = async (id: string) => {
    try {
      const { deletedBookmark, updateBookmarks } =
        await handleDeleteMovieBookmark(id)
      setDeletedBookmarkMessage(deletedBookmark)
      setDeletedBookmark(updateBookmarks.bookmarks)
      setIsAdded(false)
      setIsDeleted(true)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  const movieList = isDeleted
    ? deletedBookmark
    : isAdded
    ? addedBookmark
    : movies

  return (
    <>
      {/* {deletedBookmarkMessage && (
        <AlertResponse message={deletedBookmarkMessage} />
      )} */}
      {isSearchRoute ? (
        <MoviesHeader
          title={title || ''}
          genreList={genreList || []}
          onMoviePress={onMoviePress}
        />
      ) : null}
      <View style={styles.sectionContainer}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          {!isSearchRoute && <Text style={styles.sectionTitle}>{title}</Text>}
          {!isTopMovies && !isSearchRoute && (
            <View style={styles.buttonContainer}>
              {[2, 4, 6, 8, 10].map((limit) => (
                <Pressable
                  key={limit}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        limit === activeLimit
                          ? constants.accent
                          : constants.dark,
                    },
                  ]}
                  onPress={() => handleLimitChange(limit)}
                >
                  <Text style={{ color: constants.white }}>{limit}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        <FlatList
          data={movieList}
          horizontal={isTopMovies}
          numColumns={isTopMovies ? 0 : 3}
          keyExtractor={(movie, index) => `${movie._id}-${index}`}
          renderItem={({ item, index }) => (
            <Movie
              id={item._id}
              title={item.title}
              description={item.description}
              genres={item.genres}
              posterUrl={item.posterUrl}
              numbering={index + 1}
              isTopMovies={isTopMovies}
              addBookmarkMovie={addBookmarkMovie}
              deleteBookmarkMovie={deleteBookmarkMovie}
              rating={item.rating}
            />
          )}
          showsHorizontalScrollIndicator={isTopMovies}
          nestedScrollEnabled
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    width: Dimensions.get('screen').width * 0.9,
    marginHorizontal: 'auto',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: constants.white,
    marginBottom: 10,
    fontFamily: 'Inter-regular',
  },
  footer: {
    alignItems: 'center',
    position: 'relative',
    top: -15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: constants.light,
    borderRadius: 4,
    width: 25,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MoviesSection
