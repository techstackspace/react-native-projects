import { handleLoginUser } from '@/api'
import Main from '@/components/shared/Main'
import { router, useLocalSearchParams, Link } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useState, useEffect } from 'react'
import {
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  View,
} from 'react-native'
import { constants } from '@/constants'
import Header from '@/components/UI/Header'
import Navbar from '@/components/UI/Navbar'
import Container from '@/components/shared/Container'

const LoginScreen = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { message: incomingMessage } = useLocalSearchParams()
  const [message, setMessage] = useState(incomingMessage || '')

  useEffect(() => {
    if (incomingMessage) {
      setMessage(incomingMessage as string)

      const timeout = setTimeout(() => {
        setMessage('')
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [incomingMessage])

  const loginUser = async () => {
    setLoading(true)
    setError(null)
    try {
      const payload = { email, password }
      const data = await handleLoginUser(payload)
      router.push({
        pathname: '/',
        params: {
          message: data.token ? 'Login Successful' : 'Login Unsuccessful',
        },
      })
      await SecureStore.setItemAsync('authToken', data.token)
    } catch (error) {
      setError('An error occurred while registering')
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Main>
      <Navbar />
      <Header onChangeText={() => {}} text={''} />
      <Container style={{ marginTop: 63 }}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={constants.light}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={constants.light}
          secureTextEntry
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator size="large" color={constants.primary} />
        ) : (
          <Pressable style={styles.button} onPress={loginUser}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        )}

        <View style={styles.authText}>
          <Text style={{ color: constants.light, fontSize: 14 }}>
            Don't have an account?
          </Text>
          <Link href="/Register">
            <Text style={{ color: constants.accent, fontSize: 14 }}>
              Register
            </Text>
          </Link>
        </View>

        {error && (
          <View style={[styles.message, { backgroundColor: '#f5dfdf' }]}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {message && (
          <View style={[styles.message, { backgroundColor: constants.accent }]}>
            <Text style={styles.successText}>{message}</Text>
          </View>
        )}
      </Container>
    </Main>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: constants.light,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    marginVertical: 10,
    borderRadius: 30,
    color: constants.light,
    fontSize: 16,
  },
  authText: {
    marginLeft: 'auto',
    marginTop: 20,
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    backgroundColor: constants.accent,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: constants.dark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    backgroundColor: '#f5dfdf',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    marginTop: 60,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    textAlign: 'center',
  },
})

export default LoginScreen
