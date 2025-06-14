import { useContext, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import Header from '@/components/shared/Header'
import MoviesSection from '@/components/shared/MoviesSection'
import Main from '@/components/shared/Main'
import Alert from '@/components/shared/Alert'
import AuthAlert from '@/components/shared/AuthAlert'
import Navbar from '@/components/shared/Navbar'
import useMovies from '@/hooks/useMovies'
import { SectionsProps } from './interface'
import { MovieContext } from '@/context'
import AlertResponse from '@/components/shared/AlertResponse'

const Home = () => {
  const { width } = useWindowDimensions()
  const { addedMessage, addedError } = useContext(MovieContext)

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
      <>
        <MoviesSection
          title={item.title || ''}
          movies={item.data || []}
          isTopMovies={item.type === 'topMovies'}
          setCurrentPage={setCurrentPage}
          setCurrentLimit={setCurrentLimit}
          totalMovies={totalMovies}
          loading={latestLoading}
          deleteBookmarkMovie={() => {}}
        />
      </>
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
      {topError && latestError ? (
        <AlertResponse message="An error occured in getting both top movies and latest movies" />
      ) : topError ? (
        <AlertResponse message={topError} />
      ) : latestError ? (
        <AlertResponse message={latestError} />
      ) : null}
      {addedMessage && null}
      {addedMessage && <AlertResponse message={addedMessage} />}
      {addedError && <AlertResponse message={addedError} />}
      {addedError && null}
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
})

export default Home
