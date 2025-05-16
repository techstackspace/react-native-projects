# Search Component

This component renders a stylized search input field with a built-in icon for movie search functionality. It routes the user to the search screen on interaction and communicates the input text to its parent via a callback.

## References

- [React Native TextInput](https://reactnative.dev/docs/textinput)
- [React Native Image](https://reactnative.dev/docs/image)
- [React Native View](https://reactnative.dev/docs/view)
- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- [React Native Dimensions](https://reactnative.dev/docs/dimensions)
- [Expo Router - router.push](https://expo.github.io/router/docs/api/router#routerpush)

## Component Props

| Prop           | Type                     | Description                                      |
| -------------- | ------------------------ | ------------------------------------------------ |
| `onChangeText` | `(text: string) => void` | Callback for updating the search text externally |
| `text`         | `string`                 | Current search text controlled by the parent     |

## Behavior

- **Search Input Field:** A `TextInput` styled with a rounded border, light text, and left padding to accommodate an icon.
- **Icon Overlay:** A small magnifying glass icon is absolutely positioned within the input field on the left.
- **Dynamic Width:** The input field adapts to screen width using `Dimensions.get("screen").width * 0.9`.
- **Navigation Trigger:** Pressing into the input (`onPress`) programmatically navigates the user to the `/(tabs)/Search` screen using `router.push`.
- **Controlled Input:** The search field value is externally managed via the `text` prop and `onChangeText` callback.

## Assets

- [`Search Icon`](/assets/images/nav/search/search.png)

## Styling

| Style Key | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `view`    | Container for the input and icon, uses `relative` positioning         |
| `input`   | Rounded input with custom background, left padding, and dynamic width |
| `image`   | Absolutely positioned magnifying glass icon inside the input field    |

---

Let me know if you want to document the `Nav` wrapper that uses this `Search` component next!