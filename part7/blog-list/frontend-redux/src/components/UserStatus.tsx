import { useAppSelector } from 'src/stores'
import { useLogoutMutation } from 'src/stores/auth'
import { clearUser } from 'src/stores/user/action'

export const UserStatus = () => {
  const user = useAppSelector((state) => state.user)
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout().unwrap()
    clearUser()
  }

  return (
    <div className="flex items-center gap-1">
      <p>{user.name} logged in</p>
      <button
        data-testid="logout"
        className="border border-black px-2 active:bg-gray-100"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  )
}
