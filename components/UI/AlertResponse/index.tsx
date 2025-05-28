import { constants } from '@/constants'
import { StyleSheet, Text, View } from 'react-native'

interface AlertResponseProps {
  message: string
}

const AlertResponse = ({ message }: AlertResponseProps) => {
  return (
    <View style={styles.alertContainer}>
      <View style={styles.alert}>
        <Text>{message}</Text>
      </View>
    </View>
  )
}
export default AlertResponse

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 180,
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
