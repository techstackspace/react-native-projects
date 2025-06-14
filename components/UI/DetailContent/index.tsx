import { Image, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import useMovie from '@/hooks/useMovie'
import Container from '../../shared/Container'
import { constants } from '@/constants'
import {
  countryList,
  formatCurrencyAbbreviation,
  formatDateWorldwide,
  formatNumber,
  productionCompany,
} from '@/utility'
import { MoviesInterface } from '@/components/shared/MoviesSection/interfaceface'

const DetailContent = () => {
  const { id } = useLocalSearchParams()
  const { movie } = useMovie(id as string) as unknown as MoviesInterface
  const year = movie?.releaseDate?.split('-')[0]

  const countries = countryList(movie?.countries as string[])
  const productionCompanies = productionCompany(
    movie?.productionCompanies as string[],
  )

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{movie?.title}</Text>
      <View style={styles.summary}>
        <Text style={styles.releaseDate}>{year}</Text>
        <Text style={[styles.releaseDate, styles.dot]}></Text>
        <Text style={styles.releaseDate}>PG-13</Text>
        <Text style={[styles.releaseDate, styles.dot]}></Text>
        <Text style={styles.releaseDate}>{movie?.duration}</Text>
      </View>
      <View style={[styles.flexRow, { gap: 10 }]}>
        <View style={styles.rating}>
          <Image
            style={styles.ratingImage}
            source={require('@/assets/images/Rating.png')}
          />
          <Text style={[styles.ratingText, { color: constants.white }]}>
            {movie?.rating.average.toFixed(2)}
            <Text style={styles.ratingText}>
              /10 ({formatNumber(movie?.rating.count || 0)})
            </Text>
          </Text>
        </View>

        <View style={[styles.rating, { width: 39 }]}>
          <Image
            style={styles.ratingImage}
            source={require('@/assets/images/rising.png')}
          />
          <Text style={[styles.ratingText, { color: constants.white }]}>1</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.heading, { marginVertical: 10 }]}>Overview</Text>
        <Text style={styles.overviewDescription}>{movie?.description}</Text>
      </View>
      <View style={styles.flexRow}>
        <View>
          <Text style={styles.heading}>Release date</Text>
          <Text style={styles.descriptionText}>
            {formatDateWorldwide(movie?.releaseDate || '2019-05-26')}
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Revenue</Text>
          <Text style={styles.descriptionText}>{movie?.status}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Genres</Text>
        <View style={styles.genres}>
          {movie?.genres.map((genre: string) => (
            <View style={styles.genre} key={genre}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Countries</Text>
        <View style={styles.contentList}>
          {countries?.map((country, index) =>
            country !== '' ? (
              <Text style={styles.descriptionText} key={country}>
                {country}
              </Text>
            ) : (
              <Text style={styles.dot} key={index}></Text>
            ),
          )}
        </View>
      </View>
      <View style={styles.flexRow}>
        <View>
          <Text style={styles.heading}>Budget</Text>
          <Text style={styles.descriptionText}>
            {formatCurrencyAbbreviation(movie?.budget || '')}
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Revenue</Text>
          <Text style={styles.descriptionText}>
            {formatCurrencyAbbreviation(movie?.revenue || '')}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Tagline</Text>
        <Text style={styles.descriptionText}>{movie?.tagline}</Text>
      </View>
      <View>
        <Text style={styles.heading}>Production Companies</Text>
      </View>
      <View style={styles.contentList}>
        {productionCompanies?.map((productionCompany, index) =>
          productionCompany !== '' ? (
            <Text style={styles.descriptionText} key={productionCompany}>
              {productionCompany}
            </Text>
          ) : (
            <Text style={styles.dot} key={index}></Text>
          ),
        )}
      </View>
    </Container>
  )
}

export default DetailContent

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
  },
  title: {
    color: constants.white,
    fontSize: 20,
    fontWeight: 700,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 10,
  },
  releaseDate: {
    color: constants.light,
    fontSize: 14,
    marginTop: 5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: constants.light,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    gap: 5,
    backgroundColor: constants.badge,
    width: 116,
    borderRadius: 4,
    marginVertical: 10,
  },
  ratingImage: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 12,
    color: constants.light,
  },
  heading: {
    fontSize: 12,
    color: constants.light,
    marginTop: 20,
    marginBottom: 15,
  },
  overviewDescription: {
    fontSize: 14,
    color: constants.white,
    lineHeight: 26.5,
    fontWeight: 400,
    fontFamily: 'Inter',
    marginTop: -15,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 32,
  },
  descriptionText: {
    fontSize: 14,
    color: constants.info,
    marginTop: -15,
    fontWeight: 600,
    lineHeight: 26.5,
    fontFamily: 'Inter-bold',
  },
  genres: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 9,
    marginTop: -5,
  },
  genre: {
    backgroundColor: constants.badge,
    borderRadius: 4,
    color: constants.white,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    height: 24,
  },
  genreText: {
    color: constants.white,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'Inter-bold',
  },
  contentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    lineHeight: 25,
  },
})
