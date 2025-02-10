import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersAPI = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/',
  }),
  endpoints: (builder) => ({
    users: builder.query<any, void>({
      query: () => '/users',
    }),
    user: builder.query({
      query: (id: string) => `/users/${id}`,
    }),
  }),
})

export const { useUsersQuery, useUserQuery } = usersAPI
