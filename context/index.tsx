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
  bookmarkId: string | null
  logoutError: string | null
  addedError: string | null
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
  bookmarkId: '',
  logoutError: null,
  addedError: null,
})

const MovieProvider = ({ children }: MovieProviderProps) => {
  const { loadBookmark, bookmark } = useBookmark()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null)
  const [addedError, setAddedError] = useState<string | null>(null)
  const [bookmarkId, setBookmarkId] = useState('')
  const [logoutError, setLogoutError] = useState<string | null>(null)

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
        setAddedError(error.message)
        setTimeout(() => {
          setAddedError(null)
        }, 3000)
      }
    }
  }

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken')
      setIsLoggedIn(false)
      setLogoutMessage('User logged out successfully')
      setTimeout(() => {
        setLogoutMessage(null)
      }, 3000)
    } catch (error) {
      setLogoutError('There was any error logging out')
      setTimeout(() => {
        setLogoutError(null)
      }, 3000)
    }
  }
  return (
    <MovieContext.Provider
      value={{
        isLoggedIn,
        message: logoutMessage,
        logout,
        checkAuthStatus,
        bookmark,
        addBookmarkMovie,
        addedMessage,
        logoutError,
        addedError,
        bookmarkId,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export { MovieContext, MovieProvider }
