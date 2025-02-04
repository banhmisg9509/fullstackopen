import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3001/anecdotes";

export const anecdotesAPI = createApi({
  reducerPath: "anecdotes",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    anecdotes: builder.query({
      query: (filter) => ({
        url: filter
          ? `?content_like=${filter}&_sort=votes&_order=desc`
          : "?_sort=votes&_order=desc",
      }),
      providesTags: ["ANECDOTES"],
    }),
    vote: builder.mutation({
      query: (anecdote) => ({
        url: `/${anecdote.id}`,
        method: "PATCH",
        body: { votes: anecdote.votes + 1 },
      }),
      invalidatesTags: ["ANECDOTES"],
    }),
    create: builder.mutation({
      query: (anecdote) => ({
        url: "/",
        method: "POST",
        body: anecdote,
      }),
      invalidatesTags: ["ANECDOTES"],
    }),
  }),
});

export const { useAnecdotesQuery, useVoteMutation, useCreateMutation } =
  anecdotesAPI;
