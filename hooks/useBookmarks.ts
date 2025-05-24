import { useEffect, useState } from 'react'
import { handleFetchBookmarkMovies } from '@/api'
import { useSegments } from 'expo-router/build/hooks'

export const useBookmarks = (page: number, url: string) => {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sumMovies, setSumMovies] = useState(0)
  const segments = useSegments() as string[]
  const isBookmark = segments.includes('Bookmark')

  useEffect(() => {
    const timeoutId = setTimeout(() => loadBookmarkMovies(), 400)
    return () => clearTimeout(timeoutId)
  }, [page, url, isBookmark])

  const loadBookmarkMovies = async () => {
    try {
      setLoading(true)
      const data = await handleFetchBookmarkMovies(url)
      setBookmarks((prevMovies) =>
        page === 1 ? data.bookmarks : [...prevMovies, ...data.bookmarks],
      )
      setSumMovies(data.totalMovies)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return { bookmarks, loading, error, sumMovies }
}
