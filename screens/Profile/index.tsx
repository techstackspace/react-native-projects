import { StyleSheet, Text, View } from 'react-native'
import { constants } from '@/constants'
import Main from '@/components/shared/Main'
import Navbar from '@/components/UI/Navbar'
import Alert from '@/components/UI/Alert'

const ProfileScreen = () => {
  return (
    <Main>
      <Navbar />
      <Alert message="Login to see profile" name="login" />
    </Main>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
