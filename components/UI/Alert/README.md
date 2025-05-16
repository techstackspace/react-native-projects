# Alert Component

This component displays an alert message with a customizable icon and text input, making it suitable for empty state screens or notifications. It includes flexible icon, size, color, and text input handling, providing a consistent design across different states.

---

## References

- [React Native `View`](https://reactnative.dev/docs/view)
- [React Native `Text`](https://reactnative.dev/docs/text)
- [React Native `StyleSheet`](https://reactnative.dev/docs/stylesheet)
- [React Native `TextInput`](https://reactnative.dev/docs/textinput)
- [@expo/vector-icons SimpleLineIcons](https://docs.expo.dev/guides/icons/#simplelineicons)
- [Expo Font Loading (`useFonts`)](https://docs.expo.dev/guides/using-custom-fonts/)
- [React Component Composition](https://reactjs.org/docs/composition-vs-inheritance.html)

---

## Component Props

| Prop         | Type                         | Description                           |
| ------------ | ---------------------------- | ------------------------------------- |
| message      | `string`                     | The message to display in the alert   |
| text         | `string`                     | Text input value                      |
| onChangeText | `(text: string) => void`     | Callback when the input text changes  |
| name         | `SimpleLineIconNames`        | Name of the icon from SimpleLineIcons |
| size         | `number` (default: `100`)    | Size of the icon                      |
| color        | `string` (default: `"#666"`) | Color of the icon                     |

---

## Behavior

- **Icon Customization:** Displays a centered icon with customizable name, size, and color, leveraging `SimpleLineIcons` for a wide range of choices.
- **Message Display:** Renders a message below the icon with centered, bold text for clear communication.
- **Text Input Integration:** Includes a `Nav` component for handling user input, enhancing interactivity.
- **Consistent Styling:** Uses consistent padding, gap, and typography for a polished appearance.
