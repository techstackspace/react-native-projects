# MovieCover Component

Displays a full-width movie poster as a background image with a stylized play button overlay. It visually highlights the selected movie using a background image and provides a user interface cue for media playback.

## References

* [React Native ImageBackground](https://reactnative.dev/docs/imagebackground)
* [React Native Dimensions](https://reactnative.dev/docs/dimensions)
* [React Native Pressable](https://reactnative.dev/docs/pressable)
* [React Native SVG](https://github.com/software-mansion/react-native-svg)
* [React Native View](https://reactnative.dev/docs/view)

## Component Props

This component does not accept external props directly. It uses internal hooks to derive the movie data:

| Hook                   | Description                                |
| ---------------------- | ------------------------------------------ |
| `useLocalSearchParams` | Extracts the `id` parameter from the route |
| `useMovie(id)`         | Fetches movie data including `posterUrl`   |

## Behavior

* **Poster Display:** Uses the movie’s `posterUrl` as the background image, covering 50% of the screen height.
* **Play Button Overlay:** A circular white play button is overlaid near the bottom-right corner of the image.
* **SVG Icon Gradient:** The play icon inside the button is styled using a linear gradient via `react-native-svg`.
* **Absolute Positioning:** The play button is positioned with `absolute`, offset from the bottom and right of the image.