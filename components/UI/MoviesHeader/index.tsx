import { constants } from '@/constants'
import { ScrollView, Text, Pressable, StyleSheet, View } from 'react-native'
import { MoviesHeaderProps } from './interface'

const MoviesHeader = ({
  title,
  genreList,
  onMoviePress,
}: MoviesHeaderProps) => (
  <View style={styles.movieSearchHeader}>
    <Text style={styles.title}>
      Search result for {''}
      <Text style={styles.searchText}>
        {title.length > 17 ? `${title.substring(0, 17)}...` : title}
      </Text>
    </Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categories}
    >
      {genreList.map((genre) => (
        <Pressable
          key={genre}
          style={styles.categoryButton}
          onPress={() => onMoviePress(genre)}
        >
          <Text style={styles.categoryText}>{genre}</Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
)

const styles = StyleSheet.create({
  movieSearchHeader: {
    marginHorizontal: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: constants.white,
    fontFamily: 'Inter-regular',
  },
  searchText: { fontWeight: 700, color: '#D1C0FF' },
  categories: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: constants.secondary,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  categoryText: {
    fontSize: 12,
    color: '#ECECFF',
    fontWeight: 500,
    fontFamily: 'Inter',
  },
})

export default MoviesHeader
