import { useEffect, useState } from 'react'
import { handleFetchBookmarkMovies } from '@/api'

const useBookmarks = (page: number, limit: number) => {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sumMovies, setSumMovies] = useState(0)

  useEffect(() => {
    loadBookmarkMovies()
  }, [page, limit])

  const loadBookmarkMovies = async () => {
    try {
      setLoading(true)
      const url = `/api/users/bookmarks?limit=${limit}&page=${page}`
      const data = await handleFetchBookmarkMovies(url)
      setBookmarks((prevMovies) =>
        page === 1 ? data.bookmarks : [...prevMovies, ...data.bookmarks],
      )
      setSumMovies(data.totalBookmarks)
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
