import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { pushNotification } from "src/stores/notification";

const baseURL = "http://localhost:3001/anecdotes";

const axiosClient = axios.create({
  baseURL,
});

export const anecdotesAPI = {
  fetch: async (filter, signal) => {
    const params = {
      _sort: "votes",
      _order: "desc",
    };

    if (filter) {
      params.content_like = filter;
    }

    return (
      await axiosClient.get("/", {
        params,
        signal,
      })
    ).data;
  },

  create: async (anecdote) => (await axiosClient.post("/", anecdote)).data,
  vote: async (anecdote) =>
    (
      await axiosClient.patch(`/${anecdote.id}`, {
        votes: anecdote.votes + 1,
      })
    ).data,
};

export const useAnecdotes = (filter = "") => {
  const result = useQuery({
    queryKey: ["anecdotes", filter],
    queryFn: ({ queryKey, signal }) => anecdotesAPI.fetch(queryKey[1], signal),
    retry: false,
    staleTime: Infinity,
  });

  return result;
};

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: anecdotesAPI.create,
    onSuccess: () => queryClient.invalidateQueries(["anecdotes"]),
    onError: (error) => {
      const errorMessage = error.response.data.error;
      pushNotification(errorMessage);
    },
  });
};

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: anecdotesAPI.vote,
    onSuccess: () => queryClient.invalidateQueries(["anecdotes"]),
  });
};
