import { atom, useAtomValue } from "jotai";
import { store } from ".";

const filter = atom("");
export const useFilter = () => useAtomValue(filter);
export const setFilter = (value) => store.set(filter, value);
