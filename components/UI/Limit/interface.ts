export interface LimitProps {
  title: string
  isTopMovies: boolean
  handleLimitChange: (limit: number) => void
  activeLimit: number
}
