import axios from 'axios'

const loginURL = '/api/login'
const logoutURL = '/api/logout'

const login = async (username, password) => {
  const response = await axios.post(loginURL, {
    username,
    password,
  })

  return response.data
}

const logout = async () => {
  const resposne = await axios.get(logoutURL)
  return resposne.data
}

export default { login, logout }
