# Movie API Utility

This module provides functions to interact with the movie API, including fetching all movies and fetching movies by their unique IDs. It dynamically sets the server host based on the platform to ensure compatibility across iOS, Android, and web.

## References

* [React Native `Platform`](https://reactnative.dev/docs/platform)
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Error Handling in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

## Component Functions

### **HOST**

Determines the server host based on the platform:

| Variable | Type     | Description                   |
| -------- | -------- | ----------------------------- |
| `HOST`   | `string` | Base URL for the API requests |

```typescript
const HOST =
  Platform.OS === "android"
    ? "http://192.168.0.167:4000"
    : "http://localhost:4000";
```

---

### **handleFetchMovies**

Fetches a list of movies from the server.

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `url`     | `string` | API endpoint for the movies |

Returns a promise that resolves to the fetched data or throws an error if the request fails.

```typescript
const handleFetchMovies = async (url: string) => {
  try {
    const response = await fetch(`${HOST}${url}`);

    if (!response.ok) {
      throw new Error(
        `Unable to fetch top movies collections. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
```

---

### **handleFetchMoviesById**

Fetches a single movie by its unique ID.

| Parameter | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `id`      | `string` | Unique identifier for the movie |

Returns a promise that resolves to the fetched data or throws an error if the request fails.

```typescript
const handleFetchMoviesById = async (id: string) => {
  try {
    const response = await fetch(`${HOST}/api/movies/${id}`);

    if (!response.ok) {
      throw new Error(
        `Unable to fetch movie with the id of ${id}. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
```

---

## Exports

```typescript
export { handleFetchMovies, handleFetchMoviesById };
```

---

## Behavior

* **Platform-Specific URL Handling:** Automatically switches between local server (`localhost`) for iOS and remote server (`192.168.0.167`) for Android.
* **Error Handling:** Provides detailed error messages for failed requests.
* **JSON Parsing:** Safely parses server responses as JSON.
