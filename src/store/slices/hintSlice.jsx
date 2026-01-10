import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hint: false,
};

const hintSlice = createSlice({
  name: "hint",
  initialState,
  reducers: {
    toggleHint: (state) => {
      state.hint = !state.hint;
    },
  },
});

export const { toggleHint } = hintSlice.actions;
export const hintSliceReducer = hintSlice.reducer;
