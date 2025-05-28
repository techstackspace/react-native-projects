import { useEffect, useState } from 'react'
import { handleFetchBookmarkMovies } from '@/api'

const useBookmarks = (
  page: number,
  limit: number,
  search: string,
  isBookmark: boolean,
) => {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sumMovies, setSumMovies] = useState(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => loadBookmarkMovies(), 400)
    return () => clearTimeout(timeoutId)
  }, [page, limit, search, isBookmark])

  const loadBookmarkMovies = async () => {
    try {
      setLoading(true)
      const url = `/api/users/bookmarks?limit=${limit}&page=${page}&search=${search}`
      const data = await handleFetchBookmarkMovies(url)

      setBookmarks((prevMovies) =>
        page === 1 ? data.bookmarks : [...prevMovies, ...data.bookmarks],
      )
      setSumMovies(data.totalMovies)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        setTimeout(() => setError(null), 3000)
      }
    } finally {
      setLoading(false)
    }
  }

  return { bookmarks, loading, error, sumMovies, loadBookmarkMovies }
}

export default useBookmarks
