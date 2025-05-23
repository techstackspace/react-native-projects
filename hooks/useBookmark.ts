import { useState } from 'react'
import { handleFetchMovieBookmarksById } from '@/api'

export const useBookmark = () => {
  const [bookmark, setBookmark] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadBookmark = async (movieId: string) => {
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

  return { bookmark, loading, error, loadBookmark }
}
