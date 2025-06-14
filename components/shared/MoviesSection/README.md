# MoviesSection Component

This component renders a list of movies, either as a horizontal list of top movies or a grid of latest movies. It supports pagination and the ability to change the number of items displayed.

## References

- [React Native `FlatList`](https://reactnative.dev/docs/flatlist)
- [React Native `ActivityIndicator`](https://reactnative.dev/docs/activityindicator)
- [React Native `Pressable`](https://reactnative.dev/docs/pressable)
- [React Native `View`](https://reactnative.dev/docs/view)
- [React Native `Text`](https://reactnative.dev/docs/text)
- [React Native `StyleSheet`](https://reactnative.dev/docs/stylesheet)
- [React Native `Dimensions`](https://reactnative.dev/docs/dimensions)

## Component Props

| Prop            | Type                                           | Description                                                                 |
| --------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| title           | `string`                                       | Title of the movie section                                                  |
| movies          | `MoviesInterface[]`                            | Array of movie objects to display                                           |
| isTopMovies     | `boolean`                                      | Determines whether to render a horizontal list (top movies)                 |
| setCurrentPage  | `React.Dispatch<React.SetStateAction<number>>` | Function to set the current page                                            |
| totalMovies     | `number`                                       | Total number of available movies (used for pagination)                      |
| loading         | `boolean`                                      | Indicates whether the movies are currently being fetched                    |
| setCurrentLimit | `React.Dispatch<React.SetStateAction<number>>` | Function to change how many movies are shown per page                       |
| genreList       | `string[]` (optional)                          | List of genres to display in the genre filter header (shown in search only) |
| onGenrePress    | `(genre: string) => void` (optional)           | Callback when a genre is selected                                           |

## Behavior

- If the component is rendered inside the `Search` route, it displays a genre-based `MoviesHeader`.
- If `isTopMovies` is true, movies are shown horizontally.
- Otherwise, movies are displayed in a 3-column grid with limit selection buttons (2 to 10).
- When the user scrolls near the end, the component automatically loads more movies using the `onEndReached` prop.
- A loading indicator is shown while new movies are being fetched.
