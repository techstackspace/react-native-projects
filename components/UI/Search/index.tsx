import { Dimensions, Image, StyleSheet, TextInput, View } from 'react-native'
import { constants } from '@/constants'
import { useRouter, useSegments } from 'expo-router'

const Search = ({
  onChangeText,
  text,
}: {
  onChangeText: (text: string) => void
  text: string
}) => {
  const image = require('../../../assets/images/nav/search/search.png')
  const router = useRouter()
  const segments = useSegments() as string[]
  const isOnSearchPage = segments.includes('Search')
  const isOnHomePage = segments.includes('(tabs)')

  const handleFocus = () => {
    if (!isOnSearchPage) {
      router.push('/(tabs)/Search')
    }
  }

  return (
    <View style={styles.view}>
      {(isOnSearchPage || isOnHomePage) && (
        <>
          <TextInput
            style={styles.input}
            onChangeText={isOnSearchPage ? onChangeText : undefined}
            value={isOnSearchPage ? text : ''}
            placeholder="Search through 300+ movies online"
            placeholderTextColor={constants.light}
            onPressIn={handleFocus}
            returnKeyType="search"
          />
          <Image source={image} style={styles.image} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: constants.secondary,
    borderRadius: 30,
    color: constants.light,
    paddingLeft: 40,
    borderColor: constants.secondary,
  },
  image: {
    position: 'absolute',
    left: 15,
    top: 13,
    width: 16,
    height: 16,
  },
})

export default Search
