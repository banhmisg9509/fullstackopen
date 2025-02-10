import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { authAPI } from './auth'
import { blogsAPI, unAuthorizedError } from './blog'
import notification from './notification'
import user from './user'
import { usersAPI } from './users'

export const store = configureStore({
  reducer: {
    user,
    notification,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [blogsAPI.reducerPath]: blogsAPI.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(
      blogsAPI.middleware,
      authAPI.middleware,
      usersAPI.middleware,
      unAuthorizedError.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
