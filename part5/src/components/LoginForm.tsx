import PropTypes from 'prop-types'
import { FormEventHandler, useState } from 'react'
import authService from '../services/auth'
import localStore, { USER } from '../services/store'

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await authService.login(username, password)
      const loggedUser = {
        username: data.username,
        name: data.name,
      }
      localStore.set(USER, JSON.stringify(loggedUser))
      setUser(loggedUser)
    } catch (error) {
      if (error.response.status === 401) {
        showNotification(error.response.data.error, 'error')
      }
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 max-w-64">
      <div>
        <label className="flex">
          <span>username</span>
          <input
            data-testid="username"
            className="border border-black ml-auto"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="flex">
          <span>password</span>
          <input
            data-testid="password"
            className="border border-black ml-auto"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          className="border border-black px-2 active:bg-gray-100"
        >
          Login
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
}

export default LoginForm
