import { LinearGradient } from 'expo-linear-gradient'
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import { constants } from '@/constants'
import { Link, useSegments } from 'expo-router'
import { BlurView } from 'expo-blur'
import { MoviesInterface } from '../../shared/MoviesSection/interface/interface'
import { FontAwesome } from '@expo/vector-icons'

const Movie = ({
  title,
  id,
  posterUrl,
  genres,
  numbering,
  isTopMovies,
  rating,
  addBookmarkMovie,
  deleteBookmarkMovie,
}: MoviesInterface) => {
  const segments = useSegments() as string[]

  return (
    <View
      style={[styles.itemContainer, { marginLeft: isTopMovies ? 10 : 0 }]}
      key={id}
    >
      <View>
        {isTopMovies && (
          <BlurView tint="light" intensity={20} style={styles.ratingBadge}>
            <Image
              source={require('../../../assets/images/Rating.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>{rating.average.toFixed(2)}</Text>
          </BlurView>
        )}
        <Link href={`/Detail/${id}`}>
          <Image
            style={[
              styles.posterImage,
              {
                width: isTopMovies
                  ? 116
                  : Dimensions.get('screen').width < 420
                  ? 101
                  : 122,
                height: isTopMovies ? 167 : 151,
              },
            ]}
            resizeMode="cover"
            source={{ uri: posterUrl }}
          />
        </Link>
        {isTopMovies && (
          <MaskedView
            style={styles.numberingMask}
            maskElement={
              <View style={styles.numberingContainer}>
                <Text style={styles.numberingText}>{numbering}</Text>
              </View>
            }
          >
            <LinearGradient
              colors={[constants.linearPrimary, constants.linearSecondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          </MaskedView>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.title}>
            {title.length > 15 ? `${title.substring(0, 15)}...` : title}
          </Text>
          {segments.includes('Bookmark') ? (
            <Pressable onPress={() => deleteBookmarkMovie(id || '')}>
              <FontAwesome name="trash-o" color={constants.white} />
            </Pressable>
          ) : isTopMovies ? null : (
            <Pressable onPress={() => addBookmarkMovie(id || '')}>
              <FontAwesome name="bookmark-o" color={constants.white} />
            </Pressable>
          )}
        </View>
        {!isTopMovies && (
          <View style={styles.ratingContainer}>
            <Image
              source={require('../../../assets/images/Rating.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>{rating.average.toFixed(2)}</Text>
          </View>
        )}
      </View>

      {genres?.length === 1 ? (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.genre}>{genres[0]}</Text>
        </View>
      ) : (
        <Text style={styles.genre}>
          {genres[0]?.length > 10
            ? `${genres[0].substring(0, 10)}...`
            : genres[0]}
          <Text style={{ fontSize: 20 }}> . </Text>
          {genres[1]?.length > 10
            ? `${genres[0].substring(0, 10)}...`
            : genres[1]}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    position: 'relative',
  },
  posterImage: {
    borderRadius: 4,
  },
  title: {
    marginTop: 5,
    fontFamily: 'Inter-bold',
    fontSize: 12,
    fontWeight: '900',
    color: constants.white,
  },
  genre: {
    fontSize: 10,
    color: constants.badgeText,
    fontWeight: '700',
    fontFamily: 'Inter-bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
    alignItems: 'center',
  },
  ratingIcon: {
    width: 10,
    height: 10,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 8,
    color: constants.white,
    fontWeight: '900',
    fontFamily: 'Inter-bold',
    textShadowColor: '#00000054',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ratingBadge: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    gap: 3,
    overflow: 'hidden',
    borderRadius: 3,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberingMask: {
    width: 50,
    height: 50,
    marginTop: -47,
    marginLeft: -23,
  },
  numberingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberingText: {
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Inter-bold',
    fontSize: 44,
    fontWeight: '900',
    color: 'black',
  },
  gradient: {
    flex: 1,
  },
})

export default Movie
