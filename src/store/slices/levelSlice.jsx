import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../store";

const levelSlice = createSlice({
  name: "level",
  initialState: [],
  reducers: {
    addLevel(state, action) {
      state.push(action.payload);
    },
    removeLevel(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return [];
    });
  },
});

export const { addLevel, removeLevel } = levelSlice.actions;
export const levelsReducer = levelSlice.reducer;
