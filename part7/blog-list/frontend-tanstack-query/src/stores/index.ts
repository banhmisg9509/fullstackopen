import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { createStore } from 'jotai'

export const client = new QueryClient({})
export const jotaiStore = createStore()

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
})