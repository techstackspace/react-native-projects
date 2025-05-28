# useMovie Hook

This custom hook is used to fetch a single movie by its ID from a given API endpoint. It manages the loading and error states during the data-fetching process.

## References

- [React `useState`](https://react.dev/reference/react/useState)
- [React `useEffect`](https://react.dev/reference/react/useEffect)

## Hook Signature

| Parameter | Type     | Description              |
| --------- | -------- | ------------------------ |
| movieId   | `string` | ID of the movie to fetch |

## Returned Values

| Key     | Type                      | Description                     |
| ------- | ------------------------- | ------------------------------- |
| movie   | `MoviesInterface \| null` | Fetched movie object or null    |
| loading | `boolean`                 | Loading state indicator         |
| error   | `string \| null`          | Error message if fetching fails |

## Behavior

- **Fetch on ID Change:** When the `movieId` changes, the hook triggers a new fetch request.
- **Loading State:** `loading` is `true` while the movie is being fetched.
- **Error Handling:** Errors during the fetch are caught and stored in the `error` state.
- **Result Storage:** The fetched movie is stored in the `movie` state variable once loaded.
