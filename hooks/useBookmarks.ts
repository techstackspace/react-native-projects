import { useEffect, useState } from 'react'
import { handleFetchBookmarkMovies } from '@/api'

export const useBookmarks = (page: number, url: string) => {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sumMovies, setSumMovies] = useState(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => loadBookmarkMovies(), 400)
    return () => clearTimeout(timeoutId)
  }, [page, url])

  const loadBookmarkMovies = async () => {
    try {
      setLoading(true)
      const data = await handleFetchBookmarkMovies(url)
      setBookmarks((prevMovies) =>
        page === 1
          ? data.bookmarks || data
          : [...prevMovies, ...data.bookmarks],
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
