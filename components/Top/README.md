# Item Component

This component displays a single movie item, including its poster, title, genre, and optional rating. It also supports a numbering display for top movies.

## References

- [React Native `Image`](https://reactnative.dev/docs/image)
- [React Native `Text`](https://reactnative.dev/docs/text)
- [React Native `View`](https://reactnative.dev/docs/view)
- [React Native `StyleSheet`](https://reactnative.dev/docs/stylesheet)
- [Expo `LinearGradient`](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [MaskedView](https://github.com/react-native-masked-view/masked-view)

## Component Props

| Prop        | Type                                 | Description                    |
| ----------- | ------------------------------------ | ------------------------------ |
| title       | `string`                             | Movie title                    |
| id          | `string`                             | Unique movie identifier        |
| posterUrl   | `string`                             | URL for the movie poster       |
| genres      | `string[]`                           | List of genres                 |
| numbering   | `number`                             | Position number for top movies |
| isTopMovies | `boolean`                            | Flag for displaying top movies |
| rating      | `{ average: number, count: number }` | Movie rating info              |