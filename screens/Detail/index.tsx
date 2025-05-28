import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import Main from '@/components/shared/Main'
import MovieCover from '@/components/UI/MovieCover'
import DetailContent from '@/components/UI/DetailContent'
import { router, useLocalSearchParams } from 'expo-router'
import useMovie from '@/hooks/useMovie'
import GradientButton from '@/components/UI/GradientButton'
import Alert from '@/components/UI/Alert'
import { constants } from '@/constants'
import AlertResponse from '@/components/UI/AlertResponse'

const DetailScreen = () => {
  const { id } = useLocalSearchParams()
  const { movie, loading, error } = useMovie(id as string)

  if (loading) {
    return (
      <Main style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={constants.white} />
      </Main>
    )
  }
  if (!movie || error) {
    const message = error
      ? 'There was an error loading the movie detail'
      : 'No movie detail found'

    return <Alert message={message} />
  }

  return (
    <Main>
      {error && <AlertResponse message={error} />}
      <MovieCover />
      <ScrollView>
        <DetailContent />
      </ScrollView>
      <GradientButton
        style={styles.button}
        onPress={() => router.push('/')}
        icon={require('@/assets/images/arrow-right.png')}
        label="Visit Home Page"
        focused={true}
      />
    </Main>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 20,
  },
})
