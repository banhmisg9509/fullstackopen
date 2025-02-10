import { FormEventHandler } from 'react'
import { useField } from 'src/hooks/useField'
import { useLogin } from 'src/stores/auth-tanstack-query'
import {
  NotificationType,
  pushNotification,
} from 'src/stores/notifaction-jotai'
import { setUser } from 'src/stores/user-jotai'
import { Button } from './Button'
import { Input } from './Input'

export const LoginForm = () => {
  const username = useField()
  const password = useField('password')

  const { mutateAsync: login } = useLogin()

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault()
    if (!username.value || !password.value) return
    try {
      const { token, ...loggedUser } = await login({
        username: username.value,
        password: password.value,
      })
      setUser(loggedUser)
    } catch (error) {
      pushNotification(error.data.error, NotificationType.ERROR)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 max-w-72">
      <div>
        <label className="flex gap-1">
          <span>username</span>
          <Input data-testid="username" {...username} />
        </label>
      </div>
      <div>
        <label className="flex gap-1">
          <span>password</span>
          <Input data-testid="password" {...password} />
        </label>
      </div>
      <div>
        <Button type="submit">Login</Button>
      </div>
    </form>
  )
}

export default LoginForm
