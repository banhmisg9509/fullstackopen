import { useLogout } from 'src/stores/auth-tanstack-query'
import { clearUser, useUser } from 'src/stores/user-jotai'
import { Button } from './Button'

export const UserStatus = () => {
  const user = useUser()
  const { mutateAsync: logout } = useLogout()

  const handleLogout = async () => {
    await logout()
    clearUser()
  }

  return (
    <div className="flex items-center gap-1">
      <p>{user.name} logged in</p>
      <Button data-testid="logout" onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}
