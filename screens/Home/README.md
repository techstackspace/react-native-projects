# Home Screen

The Home screen serves as the main entry point, displaying the navigation header, popular movies, and latest movies, using the `useMovies` hook for fetching data.

## References

* [React Native `FlatList`](https://reactnative.dev/docs/flatlist)
* [Expo `StatusBar`](https://docs.expo.dev/versions/latest/sdk/status-bar/)
* [React Native `ActivityIndicator`](https://reactnative.dev/docs/activityindicator)

## Structure

* Renders a navigation header via the `Nav` component.
* Displays two movie sections: popular movies (horizontal) and latest movies (grid).
* Uses pagination and allows changing the number of movies displayed.