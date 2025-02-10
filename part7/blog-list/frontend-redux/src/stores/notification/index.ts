import { createSlice } from '@reduxjs/toolkit'

export enum NotificationType {
  SUCCESS,
  ERROR,
}

export interface Notification {
  content: string
  type: NotificationType
}

const initialState: Notification = {
  content: '',
  type: NotificationType.SUCCESS,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    push: (state, { payload }: { payload: Notification }) => {
      state.content = payload.content
      state.type = payload.type
    },
    clear: () => initialState,
  },
})

export const { push, clear } = notificationSlice.actions

export default notificationSlice.reducer
