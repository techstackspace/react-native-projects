# Home Screen

The `Home` component renders the main landing screen of the app. It combines multiple dynamically generated movie sections — including a search/navigation bar, top-rated movies, and the latest movies — and handles movie fetching via pagination and optional search queries.

## References

- [React Native `FlatList`](https://reactnative.dev/docs/flatlist)
- [React Native `ActivityIndicator`](https://reactnative.dev/docs/activityindicator)
- [React Native `View`](https://reactnative.dev/docs/view)
- [React Native `StyleSheet`](https://reactnative.dev/docs/stylesheet)
- [React `useState`](https://react.dev/reference/react/useState)
- [Expo `StatusBar`](https://docs.expo.dev/versions/latest/sdk/status-bar/)
- [Custom Hook `useMovies`](../hooks/useMovies.ts)
- [Custom Component `MoviesSection`](../components/MoviesSection.tsx)
- [Custom Component `Nav`](../components/Nav.tsx)

---

## Component Props

This screen does not accept external props, but it internally constructs a `sections` array of type `SectionsProps[]` to manage the layout.

### `SectionsProps` (Used Internally)

| Prop  | Type                       | Description                                                     |
| ----- | -------------------------- | --------------------------------------------------------------- |
| type  | `string`                   | Section identifier: `"nav"`, `"topMovies"`, or `"latestMovies"` |
| title | `string?`                  | Optional title shown above the section                          |
| data  | `MovieSectionInterface[]?` | Optional array of movie objects for the section                 |

### `MovieSectionInterface`

| Prop        | Type       | Description                       |
| ----------- | ---------- | --------------------------------- |
| \_id        | `string`   | Unique movie ID                   |
| title       | `string`   | Movie title                       |
| description | `string`   | Brief movie description           |
| posterUrl   | `string`   | URL to the movie poster image     |
| genres      | `string[]` | List of genres                    |
| rating      | `object`   | Rating info: `{ average, count }` |

---

## Behavior

- **Dynamic Section Rendering:** Sections are determined by a `sections` array and rendered using `FlatList`. Types like `"nav"`, `"topMovies"`, and `"latestMovies"` are handled conditionally in `renderItem`.

- **Search with Reset Pagination:** Typing in the search field (from the `Nav` component) triggers `onChangeText`, which resets pagination (`currentPage`, `currentLimit`) and updates the query string.

- **Initial Loader State:** If both top and latest movie queries are loading, and there are no available results (`totalMovies <= 1`), the screen displays a centered loading spinner using `ActivityIndicator`.

- **Pagination Handling:** `MoviesSection` receives pagination-related functions (`setCurrentPage`, `setCurrentLimit`) and the total count of movies, allowing for dynamic pagination rendering.

- **Sticky Navigation Bar:** The `Nav` component is injected as the first item of the `FlatList`, making it scroll naturally with the content.

---

## Notes

- **Key Management:** `FlatList` uses `index` as the key via `keyExtractor`, which works for fixed static sections. Consider using `type` or a UUID if dynamic reordering is introduced.

- **Performance:** Using `extraData={text}` on `FlatList` ensures it re-renders when the search term changes, which is crucial for showing updated results.

- **Responsibility Separation:** The component is well modularized. Movie fetching is delegated to `useMovies`, while UI responsibilities are handled by `Nav` and `MoviesSection`.
