import { createContext, ReactNode, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

interface MovieProviderProps {
  children: ReactNode
}

interface MovieContextType {
  isLoggedIn: boolean
  message: string | null
  logout: () => Promise<void>
  checkAuthStatus: () => Promise<void>
}

// const MovieContext = createContext<MovieContextType | undefined>(undefined)
const MovieContext = createContext<MovieContextType>({
  isLoggedIn: false,
  message: null,
  logout: async () => {},
  checkAuthStatus: async () => {},
})

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const checkAuthStatus = async () => {
    const token = await SecureStore.getItemAsync('authToken')
    setIsLoggedIn(!!token)
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
      value={{ isLoggedIn, message, logout, checkAuthStatus }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export { MovieContext, MovieProvider }
