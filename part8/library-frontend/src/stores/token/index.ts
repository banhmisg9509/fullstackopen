import { useAtomValue } from "jotai";
import { store } from "src/stores";
import { atomWithStorage, RESET } from "jotai/utils";

const initialState: string | null = null;

export const tokenAtom = atomWithStorage("TOKEN", initialState, undefined, {
  getOnInit: true,
});

export const useLoggedIn = () => {
  const token = useAtomValue(tokenAtom);
  return token !== null;
};

export const setToken = (token) => {
  store.set(tokenAtom, token);
};

export const clearToken = () => {
  store.set(tokenAtom, RESET);
};
