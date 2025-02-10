import { useAtomValue } from 'jotai'
import { jotaiStore } from 'src/stores'
import { atomWithStorage, RESET } from 'jotai/utils'

export interface User {
  username: string
  name: string
}

const USER = 'USER'

const initialState: User | null = null

export const userAtom = atomWithStorage(USER, initialState, undefined, {
  getOnInit: true,
})

export const useUser = () => useAtomValue(userAtom)

export const setUser = (user) => {
  jotaiStore.set(userAtom, user)
}

export const clearUser = () => {
  jotaiStore.set(userAtom, RESET)
}
