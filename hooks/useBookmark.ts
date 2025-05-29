import { useEffect, useState } from 'react'
import { handleFetchMovieBookmarksById } from '@/api'

const useBookmark = (movieId: string) => {
  const [bookmark, setBookmark] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadBookmark = async () => {
    try {
      setLoading(true)
      const data = await handleFetchMovieBookmarksById(movieId)
      setBookmark(data.bookmark)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookmark()
  }, [movieId])

  return { bookmark, loading, error, loadBookmark }
}

export default useBookmark
