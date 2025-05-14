# DetailScreen Component

Displays a detailed view of a selected movie. It fetches the movie data using the `useMovie` hook and composes various UI sections such as the cover image, movie details, and a navigation button to return home.

## References

- [React Native ActivityIndicator](https://reactnative.dev/docs/activityindicator)
- [React Native ScrollView](https://reactnative.dev/docs/scrollview)
- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- [React Native Router](https://docs.expo.dev/router/introduction/)
- [Custom Hook `useMovie`](../../hooks/useMovie.ts)

## Component Structure

| Component           | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| `MovieCover`        | Displays the background image and play button for the movie  |
| `DetailContent`     | Renders metadata and description for the selected movie      |
| `GradientTabButton` | Provides a stylized button to navigate back to the home page |
| `Main`              | Wraps content with shared layout styling and padding         |

## Behavior

- **Movie Fetching:** Retrieves the movie using its `id` from the local route parameters (`useLocalSearchParams`).
- **Loading State:** Renders an `ActivityIndicator` while the data is loading.
- **ScrollView Layout:** Wraps `DetailContent` in a vertical `ScrollView` to enable scrolling of longer content.
- **Navigation:** `GradientTabButton` navigates to the home page (`/`) when pressed.

## Usage

This screen is typically accessed via navigation using a dynamic route (e.g., `/Detail/[id]`).