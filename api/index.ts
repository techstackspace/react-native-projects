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
      throw new Error(
        `Unable to fetch top movies collections. Status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
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
      throw new Error('Login to see movie list')
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Failed to bookmark movie')
    }
    throw error
  }
}

const handleFetchMoviesById = async (id: string) => {
  try {
    const response = await fetch(`${HOST}/api/movies/${id}`)

    if (!response.ok) {
      throw new Error(
        `Unable to fetch movie with the id of ${id}. Status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
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
      throw new Error(`Unable to register user. Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
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
      throw new Error(`Unable to login user. Status: ${response.status}`)
    }

    const data = await response.json()
    router.push({
      pathname: '/',
      params: { user: JSON.stringify(data) },
    })
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

const handleMovieBookmark = async (movieId: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login to bookmark movie')
    }

    const response = await fetch(`${HOST}/api/users/bookmark/${movieId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to bookmark movie. Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Login required to bookmark movie')
    }
    throw error
  }
}

const handleDeleteMovieBookmark = async (movieId: string) => {
  try {
    const token = await SecureStore.getItemAsync('authToken')

    if (!token) {
      throw new Error('Login to remove bookmarked movie')
    }

    const response = await fetch(`${HOST}/api/users/bookmark/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to remove bookmarked movie. Status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Login required to bookmark movie')
    }
    throw error
  }
}

export {
  handleFetchMovies,
  handleFetchMoviesById,
  handleRegisterUser,
  handleLoginUser,
  handleMovieBookmark,
  handleFetchBookmarkMovies,
  handleDeleteMovieBookmark,
}
