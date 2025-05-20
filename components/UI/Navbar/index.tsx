import { constants } from '@/constants'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Link, router, useSegments } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const segments = useSegments()
  console.log(segments)
  const checkAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('authToken')
    if (token) {
      setIsLoggedIn(true)
      // Navigate to protected screen
    } else {
      setIsLoggedIn(false)
      // Show login/register screen
    }
  }

  console.log(isLoggedIn)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken')
      setIsLoggedIn(false)
      console.log('User logged out successfully')
      // router.push('/Login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <View style={styles.navbar}>
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
          <Pressable style={styles.button} onPress={() => logout()}>
            <SimpleLineIcons name="logout" size={16} color={constants.light} />
            <Link href="/Login">
              <Text style={{ color: constants.white, fontSize: 14 }}>
                Logout
              </Text>
            </Link>
          </Pressable>
        </View>
      ) : (
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
          <View style={styles.button}>
            <Pressable
              style={styles.authButton}
              onPress={() => router.push('/(tabs)')}
            >
              <SimpleLineIcons name="user" size={16} color={constants.light} />
              <Link href="/Register">
                <Text style={{ color: constants.white, fontSize: 14 }}>
                  Register
                </Text>
              </Link>
            </Pressable>

            <Text style={{ color: constants.white, fontSize: 14 }}>|</Text>

            <Pressable style={styles.authButton}>
              <SimpleLineIcons name="login" size={16} color={constants.light} />
              <Link href="/Login">
                <Text style={{ color: constants.white, fontSize: 14 }}>
                  Login
                </Text>
              </Link>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}
export default Navbar

const styles = StyleSheet.create({
  navbar: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginHorizontal: '5%',
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
  alert: {
    position: 'absolute',
    top: 180,
    left: '5%',
    width: '90%',
    borderRadius: 10,
    zIndex: 10,
  },
})
