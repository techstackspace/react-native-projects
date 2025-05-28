# App Directory

This is the root directory of the app powered by **Expo Router**. It sets up global navigation and manages layout structure.

## Structure

```
app/
├── _layout.tsx             # Root layout with Stack navigator
└── (tabs)/                 # Tab-based navigation layout
    ├── _layout.tsx         # Tab layout with custom buttons
    ├── index.tsx           # Home tab
    ├── Search/             # Search screen
    ├── Bookmark/           # Bookmarked items screen
    └── Profile/            # Profile screen
```

## Root Navigation

Uses a `Stack` navigator to encapsulate the tab layout.

### `app/_layout.tsx`

```tsx
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
```
