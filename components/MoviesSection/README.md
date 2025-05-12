# MoviesSection Component

This component renders a list of movies, either as a horizontal list of top movies or a grid of latest movies. It supports pagination and the ability to change the number of items displayed.

## References

- [React Native `FlatList`](https://reactnative.dev/docs/flatlist)
- [React Native `ActivityIndicator`](https://reactnative.dev/docs/activityindicator)
- [React Native `Pressable`](https://reactnative.dev/docs/pressable)
- [React Native `View`](https://reactnative.dev/docs/view)
- [React Native `Text`](https://reactnative.dev/docs/text)

## Component Props

| Prop            | Type                                           | Description                                  |
| --------------- | ---------------------------------------------- | -------------------------------------------- |
| title           | `string`                                       | Title of the movie section                   |
| movies          | `MoviesSectionInterface[]`                     | List of movie objects                        |
| isTopMovies     | `boolean`                                      | Indicates if the section displays top movies |
| setCurrentPage  | `React.Dispatch<React.SetStateAction<number>>` | Function to update the current page          |
| totalMovies     | `number`                                       | Total number of movies                       |
| loading         | `boolean`                                      | Indicates if the movies are loading          |
| setCurrentLimit | `React.Dispatch<React.SetStateAction<number>>` | Function to update the movies per page       |