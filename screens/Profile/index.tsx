import { StyleSheet, Text, View } from 'react-native'
import { constants } from '@/constants'
import Main from '@/components/shared/Main'
import Navbar from '@/components/UI/Navbar'

const ProfileScreen = () => {
  return (
    <Main>
      <Navbar />
      <View style={styles.container}>
        <Text style={{ color: constants.white }}>Profile</Text>
      </View>
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
