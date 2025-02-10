import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { axiosClient } from 'src/stores'

export const useBlogsQuery = (user) => {
  const result = useQuery<any, AxiosError>({
    queryKey: ['blogs'],
    queryFn: user
      ? async () => {
          const response = await axiosClient.get('/blogs')
          return response.data
        }
      : skipToken,
    retry: false,
  })

  return result
}

export const useLikeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (blog: any) => {
      const response = await axiosClient.put(`/blogs/${blog.id}`, {
        likes: blog.likes + 1,
      })
      return response.data
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['blog'],
      }),
  })
}

export const useDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (blog: any) => {
      const response = await axiosClient.delete(`/blogs/${blog.id}`)
      return response.data
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      }),
  })
}

export const useCreateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (blog: any) => {
      const response = await axiosClient.post('/blogs', blog)
      return response.data
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      }),
  })
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ blogId, comment }: any) => {
      const response = await axiosClient.post(
        `/blogs/${blogId}/comments`,
        comment
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['blog'],
      })
    },
  })
}

export const useBlogQuery = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1]
      const response = await axiosClient.get(`/blogs/${id}`)
      return response.data
    },
    retry: false,
  })
}
