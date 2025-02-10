import { atom, useAtomValue } from 'jotai'
import { jotaiStore } from 'src/stores'

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

export const notification = atom(initialState)

export const useNotification = () => useAtomValue(notification)

let timerId: NodeJS.Timeout
export const pushNotification = (
  content: string,
  type: NotificationType = NotificationType.SUCCESS,
  second: number = 5
) => {
  jotaiStore.set(notification, {
    content,
    type,
  })

  clearTimeout(timerId)

  timerId = setTimeout(() => {
    jotaiStore.set(notification, initialState)
  }, second * 1000)
}
