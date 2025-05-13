# Container Component

This component wraps the app content in a flex container, providing consistent horizontal padding and top margin for layout. It also sets the status bar style to light for better readability on dark backgrounds.

---

## References

* [React Native `ReactNode`](https://reactjs.org/docs/react-api.html#reactnode)
* [React Native `StatusBar`](https://docs.expo.dev/versions/latest/sdk/status-bar/)
* [React Native `StyleProp`](https://reactnative.dev/docs/stylesheet#styleprop)
* [React Native `View`](https://reactnative.dev/docs/view)
* [React Native `ViewStyle`](https://reactnative.dev/docs/viewstyle)

---

## Component Props

| Prop     | Type                   | Description                                      |
| -------- | ---------------------- | ------------------------------------------------ |
| children | `ReactNode`            | Content to be rendered inside the container      |
| style    | `StyleProp<ViewStyle>` | Additional styles to be applied to the container |

---

## Behavior

* **Layout Consistency:** Provides a full-height flex container with horizontal padding.
* **Responsive Margin:** Includes a negative top margin for precise alignment with other components.
* **Status Bar Styling:** Sets the status bar to light for better readability on dark backgrounds.
