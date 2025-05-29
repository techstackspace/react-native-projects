import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import * as SecureStore from 'expo-secure-store'
import { handlAddMovieBookmark, handleDeleteMovieBookmark } from '@/api'
import useBookmark from '@/hooks/useBookmark'
import useMovie from '@/hooks/useMovie'
import useBookmarks from '@/hooks/useBookmarks'
import { useSegments } from 'expo-router'

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
  deleteError: string | null
  deletedBookmark: any
  deletedBookmarkMessage: string | null
  isDeleted: boolean
  loadBookmark: any
  page: number
  limit: number
  search: string
  setPage: Dispatch<SetStateAction<number>>
  setLimit: Dispatch<SetStateAction<number>>
  setSearch: Dispatch<SetStateAction<string>>
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
  deletedBookmark: null,
  deletedBookmarkMessage: null,
  isDeleted: false,
  deleteError: null,
  loadBookmark: async () => {},
  page: 1,
  limit: 10,
  search: '',
  setPage: () => {},
  setLimit: () => {},
  setSearch: () => {},
})

const MovieProvider = ({ children }: MovieProviderProps) => {
  const { loadBookmark, bookmark } = useBookmark()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const segments = useSegments() as string[]
  const isBookmark = segments.includes('Bookmark')
  const { loadBookmarkMovies } = useBookmarks(page, limit, search, isBookmark)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null)
  const [addedError, setAddedError] = useState<string | null>(null)
  const [bookmarkId, setBookmarkId] = useState('')
  const [logoutError, setLogoutError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deletedBookmark, setDeletedBookmark] = useState(null)
  const [deletedBookmarkMessage, setDeletedBookmarkMessage] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const [addedMessage, setAddedMessage] = useState(null)

  const checkAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('authToken')
    const loggedIn = !!token
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      setTimeout(async () => {
        setIsLoggedIn(false)
        logout()
      }, 3600000)
    }
  }

  const addBookmarkMovie = async (id: string) => {
    setBookmarkId(id)
    try {
      const data = await handlAddMovieBookmark(id)
      setAddedMessage(data.message)
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
        deleteError,
        deletedBookmark,
        deletedBookmarkMessage,
        isDeleted,
        loadBookmark,
        page,
        limit,
        search,
        setPage,
        setLimit,
        setSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export { MovieContext, MovieProvider }
