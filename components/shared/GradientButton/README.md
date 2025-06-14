# GradientTabButton Component

This component renders a custom tab bar button with a gradient background when focused and a default style when not focused. It adapts layout based on screen width and active route.

## References

- [React Native `TouchableOpacity`](https://reactnative.dev/docs/touchableopacity)
- [React Native `Pressable`](https://reactnative.dev/docs/pressable)
- [React Native `Image`](https://reactnative.dev/docs/image)
- [React Native `Text`](https://reactnative.dev/docs/text)
- [React Native `Dimensions`](https://reactnative.dev/docs/dimensions)
- [Expo `LinearGradient`](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [Expo Router `usePathname`](https://expo.github.io/router/docs/api/usePathname/)

## Component Props

| Prop    | Type                                     | Description                             |
| ------- | ---------------------------------------- | --------------------------------------- |
| focused | `boolean`                                | Whether the tab is currently focused    |
| icon    | `ImageSourcePropType`                    | Icon to display inside the tab button   |
| label   | `string`                                 | Text label shown next to the icon       |
| onPress | `(event: GestureResponderEvent) => void` | Callback when the tab button is pressed |

## Behavior

- **Conditional Styling:** If the tab is focused, the button shows a gradient background and both icon and label. If not, it displays only the icon with a lighter tint.
- **Responsive Layout:** The button changes its layout direction and width based on the screen width. It also adjusts margin conditionally based on the current route (e.g., `"/"` or `"/Profile"`).
- **Route Awareness:** Uses `usePathname` to determine current route and apply context-aware margin styling.
