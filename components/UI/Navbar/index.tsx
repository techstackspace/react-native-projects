import { constants } from '@/constants'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const checkAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('authToken')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken')
      setIsLoggedIn(false)
      setMessage('User logged out successfully')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setMessage('There was any error logging out')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <View style={styles.navbar}>
      {message && (
        <View
          style={{
            position: 'absolute',
            top: 180,
            zIndex: 10,
            backgroundColor: '#e2e2d9',
            padding: 20,
            width: '100%',
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
