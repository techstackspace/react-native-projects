# SearchScreen Component

This component renders a screen that allows users to search for movies by typing text and optionally filtering results by genre. It displays real-time results using pagination and handles empty states gracefully based on user input.

## References

* [React Native useState](https://react.dev/reference/react/useState)
* [React Native useEffect](https://react.dev/reference/react/useEffect)
* [React Native View](https://reactnative.dev/docs/view)
* [React Native Text](https://reactnative.dev/docs/text)
* [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
* [Expo Vector Icons - SimpleLineIcons](https://icons.expo.fyi/)
* Shared Components:

  * [Main](../../components/shared/Main/) – Screen wrapper providing global layout styling
  * [Nav](../../components/Nav/index.tsx) – Search bar with input and submit handling
  * [MoviesSection](../../components/MoviesSection/index.tsx) – Paginated and filterable movie list section
* Custom Hooks:

  * [useMovies](../../hooks/useMovies.ts) – Data fetching hook to retrieve movie lists and genres

## Component State

| State        | Type      | Description                            |
| ------------ | --------- | -------------------------------------- |
| text         | string    | User’s current input in the search bar |
| currentPage  | number    | Current page number for pagination     |
| currentLimit | number    | Number of movies to fetch per page     |
| genres       | string    | Currently selected genre               |
| genreList    | string\[] | List of genres fetched from API        |

## Behavior

* **Search Filtering:** Updates the `search` query param when the user types, removing all whitespace via `text.replaceAll(" ", "")`.
* **Pagination:** Resets `page` and `limit` when user changes input or genre. Passed to `MoviesSection` to load more results.
* **Genre Selection:** Tapping a genre chip triggers `handleGenreText`, updating the `genres` filter param.
* **Genre Fetching:** On mount, fetches all available genres from `/api/movies/genres` using `useMovies` and sets the `genreList`.
* **Empty State Handling:**

  * If search text exists but no movies found → Shows "No movies found" message.
  * If search input is blank → Prompts the user to start typing.

## Conditional Rendering

| Condition                                      | UI Outcome                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| `text.length > 0 && latestMovies.length === 0` | Shows "No movies found for ..." message with note icon              |
| `text.trim() === ""`                           | Shows prompt "Start typing to search for movies" with question icon |
| Else                                           | Renders `MoviesSection` with results, genre filter, and pagination  |

## Assets

* [SimpleLineIcons - note](https://icons.expo.fyi/SimpleLineIcons/note)
* [SimpleLineIcons - question](https://icons.expo.fyi/Index/EvilIcons/question)

## API Endpoints

| Endpoint             | Description                        |
| -------------------- | ---------------------------------- |
| `/api/movies`        | Returns list of movies (paginated) |
| `/api/movies/genres` | Returns list of all movie genres   |

## Functions

| Function          | Type                      | Description                                    |
| ----------------- | ------------------------- | ---------------------------------------------- |
| `onChangeText`    | `(text: string) => void`  | Handles search bar input and resets pagination |
| `handleGenreText` | `(genre: string) => void` | Updates selected genre and resets pagination   |