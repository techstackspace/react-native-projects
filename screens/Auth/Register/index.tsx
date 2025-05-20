import { handleRegisterUser } from '@/api'
import Main from '@/components/shared/Main'
import { Link, router, useSegments } from 'expo-router'
import { useState } from 'react'
import {
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  View,
} from 'react-native'
import { constants } from '@/constants'
import Nav from '@/components/UI/Nav'
import Navbar from '@/components/UI/Navbar'
import Container from '@/components/shared/Container'

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const segments = useSegments() as string[]
  const isOnAuthScreen = segments.includes('Register')

  const registerUser = async () => {
    setLoading(true)
    setError(null)
    try {
      const payload = { email, username, password }
      const data = await handleRegisterUser(payload)
      setMessage(data.message || 'Registration successful')
      router.push({
        pathname: '/Login',
        params: { message: data.message },
      })
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
      {isOnAuthScreen && <Nav onChangeText={() => {}} text={''} />}
      <Container style={{ marginTop: 63 }}>
        <Text style={styles.title}>Create an Account</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={constants.light}
          style={styles.input}
        />

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
          <Pressable style={styles.button} onPress={registerUser}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        )}

        <View style={styles.authText}>
          <Text style={{ color: constants.light, fontSize: 14 }}>
            Already have an account?
          </Text>
          <Link href="/Login">
            <Text style={{ color: constants.accent, fontSize: 14 }}>Login</Text>
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
  authText: {
    marginLeft: 'auto',
    marginTop: 20,
    flexDirection: 'row',
    gap: 5,
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

export default RegisterScreen
