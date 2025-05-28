import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.message}>Page Not Found</Text>
      <Link href="/" style={styles.link}>
        Go to Home
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000957',
  },
  title: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    fontSize: 20,
    color: '#cccccc',
    marginBottom: 20,
  },
  link: {
    backgroundColor: '#fff',
    color: '#000957',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: 'bold',
  },
})
