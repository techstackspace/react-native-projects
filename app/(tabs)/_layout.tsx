import { Tabs, usePathname } from 'expo-router'
import { Dimensions, StyleSheet } from 'react-native'
import GradientButton from '@/components/UI/GradientButton'
import { constants } from '@/constants'

const TabsLayout = () => {
  const pathname = usePathname()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBody,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => (
            <GradientButton
              onPress={props.onPress}
              icon={require('@/assets/images/tabs/home.png')}
              label="Home"
              focused={pathname === '/'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search/index"
        options={{
          tabBarButton: (props) => (
            <GradientButton
              onPress={props.onPress}
              icon={require('@/assets/images/tabs/search.png')}
              label="Search"
              focused={pathname === '/Search'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookmark/index"
        options={{
          tabBarButton: (props) => (
            <GradientButton
              onPress={props.onPress}
              icon={require('@/assets/images/tabs/bookmark.png')}
              label="Save"
              focused={pathname === '/Bookmark'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile/index"
        options={{
          tabBarButton: (props) => (
            <GradientButton
              onPress={props.onPress}
              icon={require('@/assets/images/tabs/profile.png')}
              label="Profile"
              focused={pathname === '/Profile'}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  tabBody: {
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: constants.secondary,
    borderRadius: 70,
    position: 'absolute',
    bottom: 40,
    height: 48,
    paddingHorizontal: 30,
    marginHorizontal: '5%',
    flexDirection: 'row',
    borderColor: constants.secondary,
  },
})
