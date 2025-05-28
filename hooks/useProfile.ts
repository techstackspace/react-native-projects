import { handleFetchProfile } from '@/api'
import { useEffect, useState } from 'react'

interface ProfileProps {
  id: string
  username: string
  email: string
  likes: string[]
  bookmarks: string[]
  createdAt: string
  updatedAt: string
  profileImage?: string
  watchHistory: string[]
}

const useProfile = () => {
  const [profile, setProfile] = useState<ProfileProps | null>(null)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await handleFetchProfile()
      setProfile(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
  }

  return { profile, error, loadProfile }
}

export default useProfile
