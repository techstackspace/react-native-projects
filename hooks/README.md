# useMovies Hook

This custom hook is used to fetch movies from a given API endpoint, manage pagination, and handle loading states.

## References

- [React `useState`](https://react.dev/reference/react/useState)
- [React `useEffect`](https://react.dev/reference/react/useEffect)

## Hook Signature

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| page      | `number` | Current page of movies to fetch  |
| url       | `string` | API endpoint for fetching movies |

## Returned Values

| Key       | Type                       | Description                      |
| --------- | -------------------------- | -------------------------------- |
| movies    | `MoviesSectionInterface[]` | Fetched list of movies           |
| loading   | `boolean`                  | Loading state indicator          |
| error     | `string \| null`           | Error message, if any            |
| sumMovies | `number`                   | Total number of movies retrieved |