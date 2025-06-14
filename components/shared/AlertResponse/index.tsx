import { constants } from '@/constants'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'

interface AlertResponseProps {
  message: string
}

const AlertResponse = ({ message }: AlertResponseProps) => {
  const { width } = useWindowDimensions()
  return (
    <View style={[styles.alertContainer, { width: width * 0.9 }]}>
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
