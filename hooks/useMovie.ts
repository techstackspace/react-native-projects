import { useEffect, useState } from 'react'
import { handleFetchMovies } from '@/api'

const useMovie = (movieId: string) => {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMovie = async () => {
    try {
      setLoading(true)
      const data = await handleFetchMovies(`/api/movies/${movieId}`)
      setMovie(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (movieId) {
      loadMovie()
    }
  }, [movieId])

  return { movie, loading, error, loadMovie }
}

export default useMovie
