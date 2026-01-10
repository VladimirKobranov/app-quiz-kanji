import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../store";

const inputSlice = createSlice({
  name: "input",
  initialState: [],
  reducers: {
    addInput(state, action) {
      state.push(action.payload);
    },
    removeInput(state, action) {
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

export const { addInput, removeInput } = inputSlice.actions;
export const inputReducer = inputSlice.reducer;
