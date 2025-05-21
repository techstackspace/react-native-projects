import Main from '@/components/shared/Main'
import Navbar from '@/components/UI/Navbar'
import Alert from '@/components/UI/Alert'

const BookmarkScreen = () => {
  return (
    <Main>
      <Navbar />
      <Alert message="Login to see all saved movie list" name="login" />
    </Main>
  )
}

export default BookmarkScreen
