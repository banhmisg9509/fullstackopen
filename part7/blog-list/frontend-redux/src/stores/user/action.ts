import { store } from 'src/stores'
import { clear, set } from '.'

export const setUser = (user) => {
  store.dispatch(set(user))
}

export const clearUser = () => {
  store.dispatch(clear())
}
