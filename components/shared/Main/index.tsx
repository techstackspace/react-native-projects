import { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { constants } from '@/constants'
import { StatusBar } from 'expo-status-bar'
import { useSegments } from 'expo-router'
import { StyleSheet } from 'react-native'

interface MainProps {
  children: ReactNode
  style?: object
}

type AppSegments = 'Home' | 'Detail' | 'Profile' | 'Search'

const Main = ({ children, style }: MainProps) => {
  const segments = useSegments() as unknown as AppSegments
  const isDetailScreen = segments.includes('Detail')

  return (
    <LinearGradient
      colors={[constants.main, constants.primary]}
      locations={[0, 0.3]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.mainContent, style]}
    >
      {isDetailScreen ? (
        children
      ) : (
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      )}
      <StatusBar style="light" />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  mainContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default Main
