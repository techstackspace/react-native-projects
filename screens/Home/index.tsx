import { useState } from 'react'
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import Nav from '@/components/UI/Nav'
import MoviesSection from '@/components/UI/MoviesSection'
import { useMovies } from '@/hooks/useMovies'
import { StatusBar } from 'expo-status-bar'
import { SectionsProps } from './interface'
import Main from '@/components/shared/Main'
import Alert from '@/components/UI/Alert'
import Navbar from '@/components/UI/Navbar'
import AuthAlert from '@/components/UI/AuthAlert'

const Home = () => {
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const topMoviesUrl = '/api/movies/top'
  const latestMoviesUrl = `/api/movies?limit=${currentLimit}&page=${currentPage}&search=${text}`

  const {
    movies: topMovies,
    loading: topLoading,
    error: topError,
  } = useMovies(1, topMoviesUrl)
  const {
    movies: latestMovies,
    loading: latestLoading,
    error: latestError,
    sumMovies: totalMovies,
  } = useMovies(currentPage, latestMoviesUrl)

  const sections = [
    { type: 'nav' },
    { type: 'topMovies', title: 'Popular Movies', data: topMovies },
    { type: 'latestMovies', title: 'Latest Movies', data: latestMovies },
  ]

  const onChangeText = (text: string) => {
    setCurrentPage(1)
    setCurrentLimit(10)
    setText(text)
  }

  const renderItem = ({ item }: { item: SectionsProps }) => {
    if (item.type === 'nav') {
      return <Nav onChangeText={onChangeText} text={text} />
    }

    return (
      <MoviesSection
        title={item.title || ''}
        movies={item.data || []}
        isTopMovies={item.type === 'topMovies'}
        setCurrentPage={setCurrentPage}
        setCurrentLimit={setCurrentLimit}
        totalMovies={totalMovies}
        loading={latestLoading}
      />
    )
  }

  const isInitialLoading = (topLoading || latestLoading) && totalMovies <= 1
  const errorMessage =
    topError && latestError
      ? 'Failed to load popular and latest movies'
      : topError
      ? 'Failed to load popular movies'
      : latestError
      ? 'Failed to load latest movies'
      : ''

  if (isInitialLoading) {
    return (
      <Main>
        <ActivityIndicator style={styles.loaderContainer} />
      </Main>
    )
  }

  if (errorMessage) {
    return (
      <Alert text={text} onChangeText={onChangeText} message={errorMessage} />
    )
  }

  return (
    <Main>
      <Navbar />
      <AuthAlert />
      <FlatList
        data={sections}
        extraData={text}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <StatusBar style="light" />
    </Main>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  navbar: {
    padding: 10,
    width: '100%',
  },
  alert: {
    position: 'absolute',
    top: 180,
    left: '5%',
    width: '90%',
    borderRadius: 10,
    zIndex: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    paddingVertical: 25,
  },
})

export default Home
