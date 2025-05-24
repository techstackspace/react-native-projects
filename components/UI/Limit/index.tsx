import { constants } from '@/constants'
import { useSegments } from 'expo-router'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'

const Limit = ({ title, isTopMovies, handleLimitChange, activeLimit }: any) => {
  const segments = useSegments()
  const isSearchRoute = (segments as string[]).includes('Search')
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      {!isSearchRoute && <Text style={styles.sectionTitle}>{title}</Text>}
      {!isTopMovies && !isSearchRoute && (
        <View style={styles.buttonContainer}>
          {[2, 4, 6, 8, 10].map((limit) => (
            <Pressable
              key={limit}
              style={[
                styles.button,
                {
                  backgroundColor:
                    limit === activeLimit ? constants.accent : constants.dark,
                },
              ]}
              onPress={() => handleLimitChange(limit)}
            >
              <Text style={{ color: constants.white }}>{limit}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}
export default Limit
const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    width: Dimensions.get('screen').width * 0.9,
    marginHorizontal: 'auto',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: constants.white,
    marginBottom: 10,
    fontFamily: 'Inter-regular',
  },
  footer: {
    alignItems: 'center',
    position: 'relative',
    top: -15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: constants.light,
    borderRadius: 4,
    width: 25,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
