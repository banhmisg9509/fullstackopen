import { createSlice } from '@reduxjs/toolkit'

const USER = 'USER'

export interface User {
  username: string
  name: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: (): User => {
    const loggedUser = localStorage.getItem(USER)
    return loggedUser ? JSON.parse(loggedUser) : null
  },
  reducers: {
    set: (_, action) => {
      const user = action.payload
      localStorage.setItem(USER, JSON.stringify(user))
      return user
    },
    clear: () => {
      localStorage.removeItem(USER)
      return null
    },
  },
})

export const { set, clear } = userSlice.actions

export default userSlice.reducer
