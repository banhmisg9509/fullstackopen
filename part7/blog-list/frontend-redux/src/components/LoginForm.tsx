import { FormEventHandler } from 'react'
import { useField } from 'src/hooks/useField'
import { useLoginMutation } from 'src/stores/auth'
import { NotificationType } from 'src/stores/notification'
import { pushNotification } from 'src/stores/notification/action'
import { setUser } from 'src/stores/user/action'
import { Button } from './Button'
import { Input } from './Input'

export const LoginForm = () => {
  const username = useField()
  const password = useField('password')

  const [login] = useLoginMutation()

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault()
    try {
      const { token, ...loggedUser } = await login({
        username: username.value,
        password: password.value,
      }).unwrap()
      setUser(loggedUser)
    } catch (error) {
      pushNotification(error.data.error, NotificationType.ERROR)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 max-w-72">
      <div>
        <label className="flex">
          <span>username</span>
          <Input
            data-testid="username"
            className="border border-black px-1 ml-auto"
            {...username}
          />
        </label>
      </div>
      <div>
        <label className="flex">
          <span>password</span>
          <Input
            data-testid="password"
            className="border border-black px-1 ml-auto"
            {...password}
          />
        </label>
      </div>
      <div>
        <Button
          type="submit"
          className="border border-black px-2 active:bg-gray-100"
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
