import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:3001/api'

export const authAPI = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => '/logout',
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authAPI
