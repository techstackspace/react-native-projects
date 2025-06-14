import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import Movie from '@/components/UI/Movie'
import { MoviesSectionProps } from '@/components/shared/MoviesSection/interface'
import { constants } from '@/constants'
import { useSegments } from 'expo-router'
import MoviesHeader from '../../UI/MoviesHeader'
import { useContext, useState } from 'react'
import { MovieContext } from '@/context'
import Limit from '@/components/shared/Limit'

const MoviesSection = ({
  title,
  movies,
  isTopMovies,
  totalMovies,
  setCurrentPage,
  loading,
  deleteBookmarkMovie,
  setCurrentLimit,
  genreList,
  onMoviePress = () => {},
}: MoviesSectionProps) => {
  const { addBookmarkMovie, loadBookmark } = useContext(MovieContext)
  const segments = useSegments()
  const isSearchRoute = (segments as string[]).includes('Search')

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

  return (
    <>
      {isSearchRoute ? (
        <MoviesHeader
          title={title || ''}
          genreList={genreList || []}
          onMoviePress={onMoviePress}
        />
      ) : null}
      <View style={styles.sectionContainer}>
        <Limit
          title={title}
          isTopMovies={isTopMovies}
          handleLimitChange={handleLimitChange}
          activeLimit={activeLimit}
        />
        <FlatList
          data={movies}
          horizontal={isTopMovies}
          numColumns={isTopMovies ? 0 : 3}
          keyExtractor={(item) => item._id as string}
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
              loadMovie={loadBookmark}
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
