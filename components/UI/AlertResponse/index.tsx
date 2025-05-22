import { constants } from '@/constants'
import { StyleSheet, Text, View } from 'react-native'

interface MessageProps {
  errorMessgae: {
    message: string
  }
}

const AlertResponse = ({ errorMessgae }: any) => {
  return (
    <View style={styles.alertContainer}>
      <View style={styles.alert}>
        <Text>{errorMessgae}</Text>
      </View>
    </View>
  )
}
export default AlertResponse
const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 200,
    height: 50,
    backgroundColor: constants.white,
    width: '90%',
    left: '5%',
    borderRadius: 10,
    zIndex: 10,
  },
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  alertText: {
    color: constants.dark,
  },
})
