import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { constants } from '@/constants'

const Alert = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { message: incomingMessage } = useLocalSearchParams()
  const [message, setMessage] = useState(incomingMessage || '')

  const checkAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('authToken')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    if (incomingMessage) {
      setMessage(incomingMessage as string)

      const timeout = setTimeout(() => {
        setMessage('')
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [incomingMessage])

  useEffect(() => {
    checkAuthStatus()
  }, [])
  return (
    <>
      {message && (
        <View
          style={[
            styles.alert,
            { backgroundColor: isLoggedIn ? constants.light : '#f5dfdf' },
          ]}
        >
          <Text
            style={[
              styles.successText,
              { color: isLoggedIn ? 'green' : 'red' },
            ]}
          >
            {message}
          </Text>
        </View>
      )}
    </>
  )
}
export default Alert
const styles = StyleSheet.create({
  navbar: {
    padding: 10,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginRight: '5%',
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
