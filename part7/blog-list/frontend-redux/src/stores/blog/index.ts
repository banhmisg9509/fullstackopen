import { createListenerMiddleware } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { clearUser } from 'src/stores/user/action'

const baseUrl = 'http://localhost:3001/api/blogs'

export const blogsAPI = createApi({
  reducerPath: 'blogs',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
  }),
  tagTypes: ['BLOGS', 'BLOG'],
  endpoints: (builder) => ({
    blogs: builder.query({
      query: () => '/',
      providesTags: ['BLOGS'],
    }),
    blog: builder.query({
      query: (id: string) => `/${id}`,
      providesTags: ['BLOG'],
    }),
    like: builder.mutation({
      query: (blog) => ({
        url: `/${blog.id}`,
        method: 'PUT',
        body: { likes: blog.likes + 1 },
      }),
      invalidatesTags: ['BLOG'],
    }),
    delete: builder.mutation({
      query: (blog) => ({
        url: `/${blog.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BLOGS'],
    }),
    create: builder.mutation({
      query: (blog) => ({
        url: '/',
        method: 'POST',
        body: blog,
      }),
      invalidatesTags: ['BLOGS'],
    }),
    createComment: builder.mutation({
      query: ({ blogId, comment }) => ({
        url: `/${blogId}/comments`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['BLOG']
    }),
  }),
})

export const unAuthorizedError = createListenerMiddleware()

unAuthorizedError.startListening({
  matcher: blogsAPI.endpoints.blogs.matchRejected,
  effect: (action) => {
    if (action.payload.status === 401) {
      clearUser()
    }
  },
})

export const {
  useBlogsQuery,
  useBlogQuery,
  useLikeMutation,
  useDeleteMutation,
  useCreateMutation,
  useCreateCommentMutation
} = blogsAPI
