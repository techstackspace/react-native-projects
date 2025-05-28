import { handleFetchLikedMovies } from '@/api'
import { useEffect, useState } from 'react'

const useLikes = (id: string) => {
  const [sumLikes, setSumLikes] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadLikes()
    }
  }, [id])

  const loadLikes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await handleFetchLikedMovies(id)
      setSumLikes(data.totalLikes)
    } catch (error) {
      if (error instanceof Error) setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sumLikes, loading, error, loadLikes }
}

export default useLikes
