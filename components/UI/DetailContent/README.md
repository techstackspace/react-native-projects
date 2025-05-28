# DetailContent Component

Displays detailed information for a selected movie, including its title, rating, genres, overview, release date, countries, budget, revenue, and production companies. Supports formatting of numbers, currency, and date for enhanced readability.

## References

- [React Native `Text`](https://reactnative.dev/docs/text)
- [React Native `View`](https://reactnative.dev/docs/view)
- [React Native `Image`](https://reactnative.dev/docs/image)
- [React Native `StyleSheet`](https://reactnative.dev/docs/stylesheet)
- [React Navigation `useLocalSearchParams`](https://docs.expo.dev/router/reference/use-local-search-params/)

## Component Props

This component does not receive any external props. It retrieves the movie ID from the route params using `useLocalSearchParams` and fetches the data using a custom `useMovie` hook.

## Behavior

- **Movie Title & Basic Info**: Displays the movie title, release year, certification, and duration.
- **Rating Display**: Shows the average rating and total number of ratings in compact format (e.g., `1.2K`, `4.3M`).
- **Overview Section**: Presents a description/overview of the movie.
- **Date Formatting**: Uses `Intl.DateTimeFormat` to present a user-friendly full release date (e.g., May 26, 2019).
- **Genres Display**: Renders each genre as a pill-shaped styled text component.
- **Countries & Production Companies**: Renders lists with dots as separators for better readability.
- **Currency Formatting**: Converts numeric budget and revenue strings to abbreviated currency format (e.g., `$150 million`, `$1.2 billion`).
- **Responsive Layout**: Uses flex layout for sections like release/budget, and country/production info to maintain structure.

## UI Highlights

- All text color, spacing, and background styling is theme-consistent using values from `constants`.
- Genre and rating sections are styled as badges for quick visual parsing.
- `Container` component used for layout margin and consistency with other screens.
