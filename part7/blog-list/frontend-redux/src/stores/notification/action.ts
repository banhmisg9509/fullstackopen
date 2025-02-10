import { store } from 'src/stores'
import { clear, NotificationType, push } from '.'

let timerId: NodeJS.Timeout
export const pushNotification = (
  content: string,
  type: NotificationType = NotificationType.SUCCESS,
  second: number = 5
) => {
  store.dispatch(push({ content, type }))

  clearTimeout(timerId)

  timerId = setTimeout(() => {
    store.dispatch(clear())
  }, second * 1000)
}
