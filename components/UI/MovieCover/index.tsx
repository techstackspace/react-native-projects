import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { useMovie } from '@/hooks/useMovie'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg'
import { MoviesInterface } from '@/components/UI/MoviesSection/interface'

const MovieCover = () => {
  const { id } = useLocalSearchParams()
  const { movie } = useMovie(id as string) as unknown as MoviesInterface

  return (
    <View>
      <ImageBackground
        source={{ uri: movie?.posterUrl }}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Pressable style={styles.playButton}>
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
        </Pressable>
      </ImageBackground>
    </View>
  )
}

export default MovieCover

const styles = StyleSheet.create({
  imageBackground: {
    height: Dimensions.get('screen').height * 0.5,
  },
  playButton: {
    position: 'absolute',
    bottom: -25,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    zIndex: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
