import { createSlice } from "@reduxjs/toolkit";

export const LIST_STORAGE_KEY = "movix-list";

const load = () => {
  try {
    const items = JSON.parse(localStorage.getItem(LIST_STORAGE_KEY));
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
};

export const listSlice = createSlice({
  name: "list",
  initialState: { items: load() },
  reducers: {
    toggleListItem: (state, action) => {
      const { id, media_type } = action.payload;
      const index = state.items.findIndex(
        (item) => item.id === id && item.media_type === media_type
      );

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.unshift(action.payload);
      }
    },
    clearList: (state) => {
      state.items = [];
    },
  },
});

export const { toggleListItem, clearList } = listSlice.actions;

export default listSlice.reducer;
