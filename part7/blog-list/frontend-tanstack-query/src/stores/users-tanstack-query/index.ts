import { useQuery } from '@tanstack/react-query'
import { axiosClient } from 'src/stores'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosClient.get('/users')
      return response.data
    },
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1]
      const response = await axiosClient.get(`/users/${id}`)
      return response.data
    },
  })
}
