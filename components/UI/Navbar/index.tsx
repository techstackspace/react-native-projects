import { constants } from '@/constants'
import { SimpleLineIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useContext, useEffect } from 'react'
import { BlurView } from 'expo-blur'
import { MovieContext } from '@/context'

const Navbar = () => {
  const movieContext = useContext(MovieContext)
  // if (!movieContext) {
  //   throw new Error('Navbar must be used within a MovieProvider')
  // }
  const { isLoggedIn, message, logout, checkAuthStatus } = movieContext

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const handleAuth = (route: Parameters<typeof router.push>[0]) => {
    router.push(route)
  }

  return (
    <BlurView intensity={40} tint="dark" style={styles.navbar}>
      {message && (
        <View
          style={{
            position: 'absolute',
            top: 180,
            zIndex: 10,
            backgroundColor: '#e2e2d9',
            padding: 20,
            width: '100%',
            left: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            display: message ? 'flex' : 'none',
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#7b7b0f' }}>{message}</Text>
        </View>
      )}
      {isLoggedIn ? (
        <View style={styles.flexBox}>
          <Pressable
            style={styles.button}
            onPress={() => router.push('/(tabs)')}
          >
            <SimpleLineIcons
              name="arrow-left"
              size={16}
              color={constants.light}
            />
            <Text style={{ color: constants.white, fontSize: 14 }}>Home</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={logout}>
            <SimpleLineIcons name="logout" size={16} color={constants.light} />
            <Text style={{ color: constants.white, fontSize: 14 }}>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.flexBox}>
          <Pressable
            style={styles.button}
            onPress={() => handleAuth('/(tabs)')}
          >
            <SimpleLineIcons
              name="arrow-left"
              size={16}
              color={constants.light}
            />
            <Text style={{ color: constants.white, fontSize: 14 }}>Home</Text>
          </Pressable>
          <View style={styles.button}>
            <Pressable
              style={styles.authButton}
              onPress={() => handleAuth('/Register')}
            >
              <SimpleLineIcons name="user" size={16} color={constants.light} />
              <Text style={{ color: constants.white, fontSize: 14 }}>
                Register
              </Text>
            </Pressable>

            <Text style={{ color: constants.white, fontSize: 14 }}>|</Text>

            <Pressable
              style={styles.authButton}
              onPress={() => handleAuth('/Login')}
            >
              <SimpleLineIcons name="login" size={16} color={constants.light} />
              <Text style={{ color: constants.white, fontSize: 14 }}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </BlurView>
  )
}
export default Navbar

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: '5%',
    backgroundColor: '#131387cc',
    zIndex: 10,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    gap: 10,
  },
  authButton: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
})
