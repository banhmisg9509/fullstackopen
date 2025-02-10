import { useMutation } from '@tanstack/react-query'
import { axiosClient } from 'src/stores'

interface Credentials {
  username: string
  password: string
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ username, password }: Credentials) => {
      const response = await axiosClient.post('/login', {
        username,
        password,
      })

      return response.data
    },
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosClient.get('/logout')
      return response.data
    },
  })
}
