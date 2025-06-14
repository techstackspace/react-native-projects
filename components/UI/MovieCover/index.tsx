import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import useMovie from '@/hooks/useMovie'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg'
import { MoviesInterface } from '@/components/shared/MoviesSection/interface'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'
import Main from '@/components/shared/Main'
import { constants } from '@/constants'
import { useContext, useEffect, useState } from 'react'
import {
  handlAddMovieBookmark,
  handleAddDislike,
  handleAddLike,
  handleDeleteMovieBookmark,
  handleWatchHistory,
} from '@/api'
import AlertResponse from '../../shared/AlertResponse'
import { FontAwesome } from '@expo/vector-icons'
import useLikes from '@/hooks/useLikes'
import useProfile from '@/hooks/useProfile'
import { MovieContext } from '@/context'
import useBookmark from '@/hooks/useBookmark'

const MovieCover = () => {
  const { width, height } = useWindowDimensions()
  const { id } = useLocalSearchParams()
  const { loadProfile } = useProfile()
  const { movie, loadMovie } = useMovie(
    id as string,
  ) as unknown as MoviesInterface
  const { isLoggedIn } = useContext(MovieContext)
  const { bookmark, loadBookmark } = useBookmark(id as string)

  const { sumLikes, loadLikes } = useLikes(id as string)
  const [watchHistoryMessage, setWatchHistoryMessage] = useState<string | null>(
    null,
  )
  const [watchHistoryError, setWatchHistoryError] = useState<string | null>(
    null,
  )
  const [likeMovieMessage, setLikeMovieMessage] = useState<null | string>(null)
  const [likeMovieError, setLikeMovieMessageError] = useState<string | null>(
    null,
  )
  const [dislikeMovieMessage, setDislikeMovieMessage] = useState<null | string>(
    null,
  )
  const [dislikeMovieError, setDislikeMovieMessageError] = useState<
    string | null
  >(null)
  const [addBookmarkMessage, setAddBookmarkMessage] = useState<string | null>(
    null,
  )
  const [addBookmarkError, setAddBookmarkError] = useState<string | null>(null)
  const [deleteBookmarkMessage, setDeleteBookmarkMessage] = useState<
    string | null
  >(null)
  const [deleteBookmarkError, setDeleteBookmarkError] = useState<string | null>(
    null,
  )

  const addWatchHistory = async () => {
    try {
      const data = await handleWatchHistory(id as string)
      setWatchHistoryMessage(data.message)
      setTimeout(() => {
        setWatchHistoryMessage(null)
      }, 3000)
    } catch (error) {
      if (error instanceof Error) {
        setWatchHistoryError(error.message)
      }
      setTimeout(() => {
        setWatchHistoryError(null)
      }, 3000)
    }
  }

  const addLikeMovie = async () => {
    try {
      const dataAddLike = await handleAddLike(id as string)
      setLikeMovieMessage(dataAddLike.message)
      await loadLikes()
      await loadProfile()
      await loadBookmark()
      setTimeout(() => setLikeMovieMessage(null), 3000)
    } catch (error) {
      if (error instanceof Error) {
        setLikeMovieMessageError(error.message)
        setTimeout(() => setLikeMovieMessageError(null), 3000)
      }
    }
  }

  const addDislikeMovie = async () => {
    try {
      const dataDislike = await handleAddDislike(id as string)
      setDislikeMovieMessage(dataDislike.message)
      await loadLikes()
      await loadProfile()
      await loadBookmark()
      setTimeout(() => setDislikeMovieMessage(null), 3000)
    } catch (error) {
      if (error instanceof Error) {
        setDislikeMovieMessageError(error.message)
        setTimeout(() => setDislikeMovieMessageError(null), 3000)
      }
    }
  }

  const addBookmarkMovie = async () => {
    try {
      const data = await handlAddMovieBookmark(id as string)
      setAddBookmarkMessage(data.message)
      await loadMovie()
      await loadProfile()
      await loadBookmark()
      setTimeout(() => {
        setAddBookmarkMessage(null)
      }, 3000)
    } catch (error) {
      if (error instanceof Error) {
        setAddBookmarkError(error.message)
      }
      setTimeout(() => {
        setAddBookmarkError(null)
      }, 3000)
    }
  }

  const deleteBookmarkMovie = async () => {
    try {
      const data = await handleDeleteMovieBookmark(id as string)
      setDeleteBookmarkMessage(data?.message)
      await loadProfile()
      await loadMovie()
      await loadBookmark()
      setTimeout(() => {
        setDeleteBookmarkMessage(null)
      }, 3000)
    } catch (error) {
      if (error instanceof Error) {
        setDeleteBookmarkError(error.message)
      }
      setTimeout(() => {
        setDeleteBookmarkError(null)
      }, 3000)
    }
  }

  const videoSource = movie?.trailerUrl

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true
  })

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player?.playing,
  })
  const { status } = useEvent(player, 'statusChange', {
    status: player.status,
  })

  const playSVG = (
    <Svg width="22" height="24" viewBox="0 0 22 24" fill="none">
      <Defs>
        <LinearGradient
          id="grad"
          x1="0.666626"
          y1="12.0027"
          x2="21.5001"
          y2="12.0027"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#D6C7FF" />
          <Stop offset="1" stopColor="#AB8BFF" />
        </LinearGradient>
      </Defs>
      <Path
        d="M19.7983 9.05234L5.77222 0.954394C5.25479 0.655658 4.66784 0.498384 4.07037 0.498383C3.4729 0.498381 2.88595 0.655649 2.36852 0.954382C1.8511 1.25311 1.42142 1.68279 1.12268 2.20021C0.823936 2.71763 0.666657 3.30458 0.666649 3.90205V20.0979C0.664432 20.6963 0.820319 21.2846 1.11853 21.8033C1.41674 22.322 1.8467 22.7528 2.36488 23.0519C2.88306 23.3511 3.47108 23.508 4.06941 23.5069C4.66775 23.5058 5.25517 23.3466 5.77222 23.0455L19.7983 14.9476C20.3157 14.6488 20.7454 14.2192 21.0441 13.7017C21.3428 13.1843 21.5001 12.5974 21.5001 11.9999C21.5001 11.4025 21.3428 10.8156 21.0441 10.2982C20.7454 9.78074 20.3157 9.35107 19.7983 9.05234Z"
        fill="url(#grad)"
      />
    </Svg>
  )

  return (
    <>
      {status === 'loading' && (
        <Main>
          <ActivityIndicator
            color={constants.light}
            size="large"
            style={styles.loaderContainer}
          />
        </Main>
      )}
      {likeMovieError && <AlertResponse message={likeMovieError} />}
      {watchHistoryError && <AlertResponse message={watchHistoryError} />}
      {addBookmarkMessage && <AlertResponse message={addBookmarkMessage} />}
      {addBookmarkError && <AlertResponse message={addBookmarkError} />}
      {deleteBookmarkMessage && (
        <AlertResponse message={deleteBookmarkMessage} />
      )}
      {deleteBookmarkError && <AlertResponse message={deleteBookmarkError} />}
      {dislikeMovieError && <AlertResponse message={dislikeMovieError} />}
      {dislikeMovieMessage && <AlertResponse message={dislikeMovieMessage} />}
      {watchHistoryMessage && <AlertResponse message={watchHistoryMessage} />}
      {likeMovieMessage && <AlertResponse message={likeMovieMessage} />}
      {!isPlaying ? (
        <View>
          <ImageBackground
            source={{ uri: movie?.posterUrl }}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <View style={styles.icons}>
              <View style={styles.bookmarkLikeIcons}>
                <View style={styles.counts}>
                  <Pressable
                    onPress={() =>
                      addBookmarkMessage
                        ? deleteBookmarkMovie()
                        : addBookmarkMovie()
                    }
                  >
                    <FontAwesome
                      name={addBookmarkMessage ? 'bookmark' : 'bookmark-o'}
                      size={22}
                      color={constants.white}
                    />
                  </Pressable>

                  <Text
                    style={[
                      styles.likes,
                      {
                        opacity: movie?.bookmarks.length === 0 ? 0 : undefined,
                      },
                    ]}
                  >
                    {movie?.bookmarks.length}
                  </Text>
                </View>
                <View style={styles.counts}>
                  <Pressable
                    onPress={sumLikes === 0 ? addLikeMovie : addDislikeMovie}
                  >
                    <FontAwesome
                      name={sumLikes === 0 ? 'heart-o' : 'heart'}
                      size={20}
                      color={constants.white}
                    />
                  </Pressable>
                  <Text
                    style={[
                      styles.likes,
                      { opacity: sumLikes === 0 ? 0 : undefined },
                    ]}
                  >
                    {sumLikes}
                  </Text>
                </View>
              </View>
            </View>
            <Pressable
              style={styles.playButton}
              onPress={() => {
                player.play()
                addWatchHistory()
              }}
            >
              {playSVG}
            </Pressable>
          </ImageBackground>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <VideoView
            style={[styles.video, { width, height }]}
            player={player}
            allowsFullscreen={true}
            allowsPictureInPicture
          />
        </View>
      )}
    </>
  )
}

export default MovieCover

const styles = StyleSheet.create({
  imageBackground: {
    height: Dimensions.get('screen').height * 0.5,
    position: 'relative',
  },
  icons: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    left: '2.5%',
  },
  bookmarkLikeIcons: {
    flexDirection: 'row',
    padding: 10,
    gap: 5,
  },
  counts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  likes: {
    color: constants.white,
    fontSize: 20,
    fontFamily: 'Inter-bold',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  playButton: {
    position: 'absolute',
    bottom: -25,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    zIndex: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 999,
  },
})
