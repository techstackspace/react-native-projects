import { createContext, ReactNode, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { handlAddMovieBookmark } from '@/api'
import { useBookmark } from '@/hooks/useBookmark'

interface MovieProviderProps {
  children: ReactNode
}

interface MovieContextType {
  isLoggedIn: boolean
  message: string | null
  logout: () => Promise<void>
  checkAuthStatus: () => Promise<void>
  bookmark: any
  addBookmarkMovie: any
  addedMessage: string | null
  error: string | null
  bookmarkId: string | null
}

// const MovieContext = createContext<MovieContextType | undefined>(undefined)
const MovieContext = createContext<MovieContextType>({
  isLoggedIn: false,
  message: null,
  logout: async () => {},
  checkAuthStatus: async () => {},
  bookmark: null,
  addBookmarkMovie: async () => {},
  addedMessage: null,
  error: null,
  bookmarkId: '',
})

const MovieProvider = ({ children }: MovieProviderProps) => {
  const { loadBookmark, bookmark } = useBookmark()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [bookmarkId, setBookmarkId] = useState('')

  const checkAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('authToken')
    setIsLoggedIn(!!token)
  }
  const [addedMessage, setAddedMessage] = useState(null)

  const addBookmarkMovie = async (id: string) => {
    setBookmarkId(id)
    try {
      const data = await handlAddMovieBookmark(id)
      setAddedMessage(data.message)
      loadBookmark(id)

      setTimeout(() => {
        setAddedMessage(null)
      }, 3000)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken')
      setIsLoggedIn(false)
      setMessage('User logged out successfully')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setMessage('There was any error logging out')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }
  return (
    <MovieContext.Provider
      value={{
        isLoggedIn,
        message,
        logout,
        checkAuthStatus,
        bookmark,
        addBookmarkMovie,
        addedMessage,
        error,
        bookmarkId,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export { MovieContext, MovieProvider }
