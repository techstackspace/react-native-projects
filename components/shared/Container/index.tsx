import { ReactNode } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'

interface ContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const Container = ({ children, style }: ContainerProps) => {
  const { width } = useWindowDimensions()
  return (
    <>
      <View style={[styles.container, style]}>
        <View style={[styles.contentView, { width: width * 0.9 }]}>
          {children}
        </View>
      </View>
      <StatusBar style="light" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    width: '90%',
    marginInline: 'auto',
    marginTop: -63,
  },
})

export default Container
