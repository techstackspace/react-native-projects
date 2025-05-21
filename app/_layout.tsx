import { MovieProvider } from '@/context'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <MovieProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Detail/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen name="Register/index" options={{ headerShown: false }} />
        <Stack.Screen name="Login/index" options={{ headerShown: false }} />
      </Stack>
    </MovieProvider>
  )
}

export default RootLayout
