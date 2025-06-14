import { useContext, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native'
import { constants } from '@/constants'
import Main from '@/components/shared/Main'
import Navbar from '@/components/shared/Navbar'
import Alert from '@/components/shared/Alert'
import AlertResponse from '@/components/shared/AlertResponse'
import { MovieContext } from '@/context'
import Header from '@/components/shared/Header'
import { handleDeleteAccount, handleUpdateUserProfile } from '@/api'
import useProfile from '@/hooks/useProfile'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'

const ProfileScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEditted, setIsEditted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileInfo, setProfileInfo] = useState<string | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<string | null>('')
  const [deleteError, setDeleteError] = useState<string | null>('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { isLoggedIn } = useContext(MovieContext)
  const { profile, error, loadProfile } = useProfile()

  const fallbackProfileImage =
    'https://res.cloudinary.com/bizstak/image/upload/v1748298685/movieCollection/profile/profile_dycxkm.png'
  const displayImageUri =
    profileImageUrl || profile?.profileImage || fallbackProfileImage

  const readableDate = new Date(profile?.createdAt || '').toLocaleString(
    'en-GB',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
  )

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access media library is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled && result.assets?.[0]?.uri) {
      setProfileImageUrl(result.assets[0].uri)
    } else {
      alert('No image selected.')
    }
  }

  const updateProfile = async () => {
    setLoading(true)
    setProfileError(null)

    try {
      const payload: {
        username?: string
        email?: string
        password?: string
        profileImageUrl?: string
      } = {}

      if (username && username !== profile?.username)
        payload.username = username
      if (email && email !== profile?.email) payload.email = email
      if (password) payload.password = password
      if (profileImageUrl) payload.profileImageUrl = profileImageUrl

      if (Object.keys(payload).length === 0) {
        setProfileError('No changes to update.')
        setTimeout(() => setProfileError(null), 3000)
        return
      }

      const message = await handleUpdateUserProfile(payload as any)
      setProfileInfo(message.message)
      loadProfile()
      setTimeout(() => setProfileInfo(null), 3000)
      setPassword('')
      setIsEditted(false)
    } catch (err) {
      if (err instanceof Error) {
        setProfileError(err.message)
        setTimeout(() => setProfileError(null), 3000)
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteAccount = async () => {
    try {
      const result = await handleDeleteAccount()
      setDeleteMessage(result.message)
      await SecureStore.deleteItemAsync('authToken')
      setTimeout(() => setDeleteMessage(null), 3000)
      loadProfile()
    } catch (error: any) {
      setDeleteError(error.message || 'Something went wrong.')
    } finally {
      setShowDeleteModal(false)
    }
  }

  const resetEdits = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setProfileImageUrl(null)
    setIsEditted(false)
  }

  if (!isLoggedIn) {
    return (
      <Main>
        <Navbar />
        <Header onChangeText={() => {}} text={''} />
        <Alert message="Login to see profile" name="login" />
      </Main>
    )
  }

  return (
    <Main>
      {loading && <ActivityIndicator size="large" color={constants.accent} />}
      {error && <AlertResponse message={error} />}
      {profileError && <AlertResponse message={profileError} />}
      {profileInfo && <AlertResponse message={profileInfo} />}
      {deleteMessage && <AlertResponse message={deleteMessage} />}
      {deleteError && <AlertResponse message={deleteError} />}

      <Navbar />
      <Header onChangeText={() => {}} text={''} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.profile}>
            <Text style={styles.title}>Profile</Text>
          </View>

          <View style={styles.avatarContainer}>
            <Image source={{ uri: displayImageUri }} style={styles.avatar} />

            {isEditted && (
              <>
                <Pressable
                  style={styles.editButtonSecondary}
                  onPress={pickImage}
                >
                  <Text style={styles.editButtonText}>Pick Profile Image</Text>
                </Pressable>

                <Text style={styles.infoLabel}>Username</Text>
                <TextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  placeholderTextColor={constants.gray}
                />

                <Text style={styles.infoLabel}>Email</Text>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  style={styles.input}
                  placeholderTextColor={constants.gray}
                />

                <Text style={styles.infoLabel}>New Password</Text>
                <TextInput
                  placeholder="New Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                  placeholderTextColor={constants.gray}
                />

                <Text style={styles.infoLabel}>Profile Image URL</Text>
                <TextInput
                  placeholder="Profile Image URL"
                  value={
                    profileImageUrl ? profileImageUrl : profile?.profileImage
                  }
                  onChangeText={setProfileImageUrl}
                  style={styles.input}
                  placeholderTextColor={constants.gray}
                />
              </>
            )}

            {!isEditted && (
              <>
                <Text style={styles.username}>{profile?.username}</Text>
                <Text style={styles.email}>{profile?.email}</Text>
              </>
            )}
          </View>

          {!isEditted && (
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{profile?.likes.length}</Text>
                <Text style={styles.statLabel}>Likes</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  {profile?.watchHistory.length}
                </Text>
                <Text style={styles.statLabel}>Watch History</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  {profile?.bookmarks.length}
                </Text>
                <Text style={styles.statLabel}>Bookmarks</Text>
              </View>
            </View>
          )}

          <View style={styles.buttonRow}>
            <Pressable
              style={styles.editButton}
              onPress={() => {
                if (isEditted) {
                  updateProfile()
                } else {
                  setUsername(profile?.username || '')
                  setEmail(profile?.email || '')
                }
                setIsEditted(!isEditted)
              }}
            >
              <Text style={styles.editButtonText}>
                {isEditted ? 'Save Changes' : 'Edit Profile'}
              </Text>
            </Pressable>

            {isEditted && (
              <Pressable style={styles.cancelButton} onPress={resetEdits}>
                <Text style={styles.editButtonText}>Cancel</Text>
              </Pressable>
            )}
          </View>

          {!isEditted && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Account Created:</Text>
              <Text style={styles.infoText}>{readableDate}</Text>
            </View>
          )}
          <View style={styles.separator}></View>

          <Pressable
            style={[styles.cancelButton, styles.deleteButton]}
            onPress={() => setShowDeleteModal(true)}
          >
            <Text style={styles.editButtonText}>Delete Account</Text>
          </Pressable>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showDeleteModal}
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Deletion</Text>
              <Text style={styles.modalText}>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Text>

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, { backgroundColor: 'red' }]}
                  onPress={deleteAccount}
                >
                  <Text style={styles.modalButtonText}>Yes, Delete</Text>
                </Pressable>

                <Pressable
                  style={[styles.modalButton, { backgroundColor: '#555' }]}
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Main>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  profile: {
    marginBottom: 20,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: constants.white,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: constants.primary,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: constants.white,
  },
  email: {
    fontSize: 16,
    color: constants.gray,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: constants.white,
  },
  statLabel: {
    fontSize: 14,
    color: constants.gray,
  },
  editButton: {
    backgroundColor: constants.accent,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: constants.cancelBtn,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
  },
  editButtonSecondary: {
    backgroundColor: constants.dark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 15,
    borderColor: constants.white,
    borderWidth: 1,
  },
  editButtonText: {
    color: constants.white,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  infoContainer: {
    width: '90%',
    backgroundColor: constants.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 14,
    color: constants.gray,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    color: constants.dark,
  },
  input: {
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: constants.dark,
    color: constants.white,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: constants.primary,
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: constants.gray,
    marginTop: 5,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: constants.dark,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: constants.white,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: constants.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: constants.white,
    fontSize: 16,
    fontWeight: '600',
  },
})
