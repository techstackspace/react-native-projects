import { payloadInterface } from '@/api/interface'
import { router } from 'expo-router'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

const HOST =
  Platform.OS === 'android'
    ? 'http://192.168.0.167:4000'
    : 'http://localhost:4000'

const handleFetchMovies = async (url: string) => {
  try {
    const response = await fetch(`${HOST}${url}`)

    if (!response.ok) {
      // Server responded with an error status (like 404, 500)
      throw new Error(
        response.status === 404
          ? `${response.status}: Unable to fetch movie collections`
          : `${response.status}: Server error while fetching data`,
      )
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    // This catches network errors (e.g. offline, DNS fail)
    if (error instanceof TypeError) {
      throw new Error('Network error: Check your internet connection')
    }

    console.error(error)
    throw error
  }
}

const handleFetchBookmarkMovies = async (url: string) => {
  try {
    const response = await fetch(`${HOST}${url}`, {
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync('authToken')}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        response.status === 401
          ? 'Login is required to get all bookmark list'
          : 'An error occured in fetching bookmark list',
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occured in getting all bookmarked list')
    }
    throw error
  }
}

const handleFetchProfile = async () => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Token not found! Login to get one')
    }

    const response = await fetch(`${HOST}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        response.status === 401
          ? 'Login is required to get profile info'
          : `${response.status}: An error occurred while fetching profile info`,
      )
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    // Detect offline or unreachable network
    if (error instanceof TypeError) {
      console.error('Network error: Check your internet connection')
      throw new Error('Network error: Check your internet connection')
    }

    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }

    console.error('An unknown error occurred, please try again!')
    throw new Error('Unknown error')
  }
}

const handleFetchMoviesById = async (id: string) => {
  try {
    const response = await fetch(`${HOST}/api/movies/${id}`)

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? `${response.status}: Unable to fetch movie with id ${id}`
          : `${response.status}: Server error while fetching movie data`,
      )
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Check your internet connection')
    }

    console.error(error)
    throw error
  }
}

const handleRegisterUser = async (payload: payloadInterface) => {
  try {
    const response = await fetch(`${HOST}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Unable to register user`

      if (response.status === 400) {
        // Server might return a detailed error in body
        const errorData = await response.json().catch(() => null)
        errorMessage =
          errorData?.message || 'Invalid input or user already exists'
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Check your internet connection')
    }

    console.error('Fetch error:', error)
    throw error
  }
}

const handleLoginUser = async (payload: payloadInterface) => {
  try {
    const response = await fetch(`${HOST}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Unable to login user`

      if (response.status === 400 || response.status === 401) {
        const errorData = await response.json().catch(() => null)
        errorMessage = errorData?.message || 'Invalid email or password'
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()

    // Safe navigation with router
    router.push({
      pathname: '/',
      params: { user: JSON.stringify(data) },
    })

    return data
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Check your internet connection')
    }

    console.error('Fetch error:', error)
    throw error
  }
}

const handleUpdateUserProfile = async () => {
  try {
    const response = await fetch(`${HOST}/api/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync('authToken')}`,
      },
    })

    if (!response.ok) {
      throw new Error(`${response.status}: Unable to update user profile`)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Unknown error occured, please try again!')
    }
    throw error
  }
}

const handleFetchMovieBookmarksById = async (movieId: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login to bookmark movie')
    }

    const response = await fetch(`${HOST}/api/users/bookmark/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`${response.status}: Failed to bookmark movie`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Unknown error occured, please try again!')
    }
    throw error
  }
}

const handlAddMovieBookmark = async (movieId: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login required to bookmark movie')
    }

    const response = await fetch(`${HOST}/api/users/bookmark/${movieId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to bookmark movie.`

      if (response.status === 401) {
        errorMessage = 'Unauthorized: Please log in again'
      } else if (response.status === 404) {
        errorMessage = 'Movie not found or invalid ID'
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    if (error instanceof TypeError) {
      console.error('Network error: Check your internet connection')
      throw new Error('Network error: Check your internet connection')
    }

    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }

    console.error('An unknown error occurred, please try again!')
    throw new Error('An unknown error occurred')
  }
}

const handleDeleteMovieBookmark = async (movieId: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login is required to remove bookmarked movie')
    }

    const response = await fetch(`${HOST}/api/users/bookmark/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to remove bookmarked movie`

      if (response.status === 401) {
        errorMessage = 'Unauthorized: Please login again'
      } else if (response.status === 404) {
        errorMessage = 'Movie not found or not bookmarked'
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    const updateBookmarks = await handleFetchBookmarkMovies(
      '/api/users/bookmarks',
    )

    return { deletedBookmark: data, updateBookmarks }
  } catch (error: any) {
    if (error instanceof TypeError) {
      console.error('Network error: Check your internet connection')
      throw new Error('Network error: Check your internet connection')
    }

    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }

    console.error('An unknown error occurred, please try again!')
    throw new Error('An unknown error occurred')
  }
}

export {
  handleFetchMovies,
  handleFetchMoviesById,
  handleFetchMovieBookmarksById,
  handleRegisterUser,
  handleLoginUser,
  handlAddMovieBookmark,
  handleFetchBookmarkMovies,
  handleDeleteMovieBookmark,
  handleFetchProfile,
  handleUpdateUserProfile,
}
