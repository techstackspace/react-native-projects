import { useRef, useState } from 'react'
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import Header from '@/components/UI/Header'
import MoviesSection from '@/components/UI/MoviesSection'
import Main from '@/components/shared/Main'
import Alert from '@/components/UI/Alert'
import AuthAlert from '@/components/UI/AuthAlert'
import Navbar from '@/components/UI/Navbar'

import { useMovies } from '@/hooks/useMovies'
import { SectionsProps } from './interface'

const Home = () => {
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const lastScrollY = useRef(0)

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

  const isInitialLoading = (topLoading || latestLoading) && totalMovies <= 1

  const errorMessage =
    topError && latestError
      ? 'Failed to load popular and latest movies'
      : topError
      ? 'Failed to load popular movies'
      : latestError
      ? 'Failed to load latest movies'
      : ''

  const sections: SectionsProps[] = [
    { type: 'nav' },
    { type: 'topMovies', title: 'Popular Movies', data: topMovies },
    { type: 'latestMovies', title: 'Latest Movies', data: latestMovies },
  ]

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y
    const deltaY = currentY - lastScrollY.current

    setIsScrollingUp(deltaY < 0)
    lastScrollY.current = currentY
  }

  const onChangeText = (text: string) => {
    setCurrentPage(1)
    setCurrentLimit(10)
    setText(text)
  }

  const renderItem = ({ item }: { item: SectionsProps }) => {
    if (item.type === 'nav') {
      return <Header onChangeText={onChangeText} text={text} />
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
      {isScrollingUp && <Navbar />}
      <AuthAlert />
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        extraData={text}
        bounces={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
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
