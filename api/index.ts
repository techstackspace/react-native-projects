import { payloadInterface } from '@/api/interface'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router/build/imperative-api'
import { BASE_URL } from '@/constants'


const handleFetchMovies = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`)

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
    const token = await SecureStore.getItemAsync('authToken')
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        response.status === 401
          ? `${response.status}: Login is required to get all bookmark list`
          : `${response.status}: An error occured in fetching bookmark list`,
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

const isLocalFile = (uri: string) =>
  uri.startsWith('file://') || uri.startsWith('content://')

const handleUpdateUserProfile = async (payload: {
  username?: string
  email?: string
  password?: string
  profileImageUrl?: string
}) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Token not found! Please log in.')
    }

    let body: any
    let headers: any = {
      Authorization: `Bearer ${token}`,
    }

    const useForm =
      payload.profileImageUrl && isLocalFile(payload.profileImageUrl)

    if (useForm) {
      const formData = new FormData()

      if (payload.username) formData.append('username', payload.username)
      if (payload.email) formData.append('email', payload.email)
      if (payload.password) formData.append('password', payload.password)

      const fileName = payload.profileImageUrl!.split('/').pop()
      const fileType = fileName?.split('.').pop()

      formData.append('profileImageUrl', {
        uri: payload.profileImageUrl!,
        name: fileName,
        type: `image/${fileType}`,
      } as any)

      body = formData
    } else {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        profileImageUrl: payload.profileImageUrl,
      })
    }

    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'PATCH',
      headers,
      body,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const errorMessage =
        errorData?.message ||
        (response.status === 401
          ? `${response.status}: Unauthorized: Please log in again`
          : `${response.status}: Failed to update profile`)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error('Network error: Check your internet connection')
    }

    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }

    throw new Error('An unknown error occurred')
  }
}

const handleFetchProfile = async () => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Token not found! Login to get one')
    }

    const response = await fetch(`${BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        response.status === 401
          ? `${response.status}: Login is required to get profile info`
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
    const response = await fetch(`${BASE_URL}/api/movies/${id}`)

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
    const response = await fetch(`${BASE_URL}/api/users/register`, {
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
    const response = await fetch(`${BASE_URL}/api/users/login`, {
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

const handleFetchMovieBookmarksById = async (movieId: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login to bookmark movie')
    }

    const response = await fetch(`${BASE_URL}/api/users/bookmark/${movieId}`, {
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
      console.error(error?.message)
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

    const response = await fetch(`${BASE_URL}/api/users/bookmark/${movieId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to bookmark movie.`

      if (response.status === 401) {
        errorMessage = `${response.status}: Unauthorized: Please log in again`
      } else if (response.status === 404) {
        errorMessage = `${response.status}: Movie not found or invalid ID`
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

    const response = await fetch(`${BASE_URL}/api/users/bookmark/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to remove bookmarked movie`

      if (response.status === 401) {
        errorMessage = `${response.status}: Unauthorized: Please login again`
      } else if (response.status === 404) {
        errorMessage = `${response.status}: Movie not found or not bookmarked`
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

const handleDeleteAccount = async () => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login is required to delete account')
    }

    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to delete account`

      if (response.status === 401) {
        errorMessage = `${response.status}: Unauthorized: Please login again`
      } else if (response.status === 404) {
        errorMessage = `${response.status}: User not found`
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error) {
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

const handleWatchHistory = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login is required to get watch history')
    }

    const response = await fetch(`${BASE_URL}/api/users/watch/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to get watch history`

      if (response.status === 401) {
        errorMessage = `${response.status}: Unauthorized: Please login again`
      } else if (response.status === 404) {
        errorMessage = `${response.status}: Watch history not found`
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error) {
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

const handleAddLike = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login is required to like movie')
    }

    const response = await fetch(`${BASE_URL}/api/movies/${id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to like movie`

      if (response.status === 401) {
        errorMessage = `${response.status}: Unauthorized: Please login again`
      } else if (response.status === 404) {
        errorMessage = `${response.status}: Movie not found`
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error) {
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

const handleAddDislike = async (id: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login is required to dislike movie')
    }

    const response = await fetch(`${BASE_URL}/api/movies/${id}/dislike`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      let errorMessage = `${response.status}: Failed to dislike movie`

      if (response.status === 401) {
        errorMessage = `${response.status}: Unauthorized: Please login again`
      } else if (response.status === 404) {
        errorMessage = `${response.status}: Movie not found`
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error) {
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

const handleFetchLikedMovies = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/movies/${id}/likes`)

    if (!response.ok) {
      throw new Error(`Failed to fetch likes: ${response.status}`)
    }

    const data = await response.json()
    return data // { totalLikes: number }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }

    console.error('Unknown error occurred while fetching likes')
    throw new Error('Unknown error occurred while fetching likes')
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
  handleDeleteAccount,
  handleWatchHistory,
  handleAddLike,
  handleAddDislike,
  handleFetchLikedMovies,
}
