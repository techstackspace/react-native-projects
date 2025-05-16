# MoviesHeader Component

Displays a heading and a horizontally scrollable genre filter for movie search results. It dynamically highlights the search query and allows users to filter results by genre.

## References

- [React Native `Text`](https://reactnative.dev/docs/text)
- [React Native `ScrollView`](https://reactnative.dev/docs/scrollview)
- [React Native `Pressable`](https://reactnative.dev/docs/pressable)
- [React Native `StyleSheet`](https://reactnative.dev/docs/stylesheet)
- [React Native `View`](https://reactnative.dev/docs/view)

## Component Props

| Prop         | Type                      | Description                                 |
| ------------ | ------------------------- | ------------------------------------------- |
| title        | `string`                  | Search query string to display in the title |
| genreList    | `string[]`                | List of movie genres                        |
| onGenrePress | `(genre: string) => void` | Callback when a genre is pressed            |

## Behavior

- **Search Result Highlighting:** The `title` is truncated after 17 characters and highlighted to differentiate it from the static label (`"Search result for"`).
- **Scrollable Genre List:** Genres are rendered as pill-shaped buttons in a horizontally scrollable container.
- **Interactive Filtering:** Tapping on a genre triggers `onGenrePress` with the selected genre.
