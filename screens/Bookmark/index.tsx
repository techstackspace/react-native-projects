import { useContext, useRef, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import Header from '@/components/shared/Header'
import MoviesSection from '@/components/shared/MoviesSection'
import Main from '@/components/shared/Main'
import AuthAlert from '@/components/shared/AuthAlert'
import Navbar from '@/components/shared/Navbar'
import { MovieContext } from '@/context'
import AlertResponse from '@/components/shared/AlertResponse'
import useBookmarks from '@/hooks/useBookmarks'
import { SectionsProps } from '../Home/interface'

const Bookmark = () => {
  const { addedMessage, addedError } = useContext(MovieContext)

  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const lastScrollY = useRef(0)

  const { bookmarks, loading, error, sumMovies } = useBookmarks(
    currentPage,
    currentLimit,
  )
  const sections: SectionsProps[] = [
    { type: 'nav' },
    { type: 'latestMovies', title: 'Bookmark movies', data: bookmarks },
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
          isTopMovies={false}
          setCurrentPage={setCurrentPage}
          setCurrentLimit={setCurrentLimit}
          totalMovies={sumMovies}
          loading={loading}
          deleteBookmarkMovie={() => {}}
        />
      </>
    )
  }

  return (
    <Main>
      {error ? <AlertResponse message={error} /> : null}
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

export default Bookmark
