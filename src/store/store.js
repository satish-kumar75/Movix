import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import listSlice, { LIST_STORAGE_KEY } from "./listSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    list: listSlice,
  },
});

let savedItems = store.getState().list.items;

store.subscribe(() => {
  const { items } = store.getState().list;
  if (items === savedItems) return;

  savedItems = items;
  try {
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(items));
  } catch {
    return;
  }
});
