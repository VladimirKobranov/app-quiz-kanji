import { configureStore } from "@reduxjs/toolkit";
import { reset, result } from "./actions";
import { addInput, inputReducer, removeInput } from "./slices/inputSlice";
import { addLevel, levelsReducer, removeLevel } from "./slices/levelSlice";
import { answerReducer, addAnswer, removeAnswer } from "./slices/answersSlice";
import { hintSliceReducer, toggleHint } from "./slices/hintSlice";
const store = configureStore({
  reducer: {
    levels: levelsReducer,
    inputs: inputReducer,
    answers: answerReducer,
    hint: hintSliceReducer,
  },
});

export {
  store,
  result,
  addLevel,
  removeLevel,
  addInput,
  removeInput,
  reset,
  addAnswer,
  removeAnswer,
  toggleHint,
};
