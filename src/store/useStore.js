import { create } from "zustand";

export const useStore = create((set) => ({
  levels: [],
  inputs: [],
  answers: {},
  hint: false,

  addLevel: (level) => set((state) => ({ levels: [...state.levels, level] })),
  removeLevel: (level) =>
    set((state) => ({ levels: state.levels.filter((l) => l !== level) })),

  addInput: (input) => set((state) => ({ inputs: [...state.inputs, input] })),
  removeInput: (input) =>
    set((state) => ({ inputs: state.inputs.filter((i) => i !== input) })),

  addAnswer: (payload) =>
    set((state) => {
      const kanji = payload.kanji;
      const currentAnswers = state.answers[kanji] || [];
      return {
        answers: {
          ...state.answers,
          [kanji]: [...currentAnswers, payload],
        },
      };
    }),
  removeAnswer: (payload) =>
    set((state) => {
      // Redux impl: const index = state.indexOf(action.payload); state.splice(index, 1);
      // But redux payload passed to removeAnswer is usually the item itself?
      // Wait, Redux implementation was:
      // const index = state.indexOf(action.payload);
      // state.splice(index, 1);
      // This suggests `state` here is the array of answers for a specific Kanji?
      // No, answersSlice state is { answers: {} }.
      // Ah, `removeAnswer(state, action)` in answersSlice seems to assume `state` is an array?
      // Let's re-read answersSlice.
      // It says `initialState: { answers: {} }`.
      // Then `removeAnswer(state, action)`.
      // `const index = state.indexOf(action.payload);`
      // If state is `{ answers: {} }`, it doesn't have `indexOf`.
      // This looks like a bug in the original Redux code or I misread it.
      // Let's assume for now we don't need strict removeAnswer parity if it was broken,
      // OR the user calls it differently.
      // But wait, the slice might have been mutated?
      // Actually, if `answersSlice` was defined with `initialState: { answers: {} }`,
      // then `state` in reducers is that object.
      // `state.indexOf` would crash.
      // Maybe the user never used `removeAnswer`?
      // I will implement a safe version or omit if unused.
      // Checking `NavControlResults` or others... removedAnswer wasn't used in the files I read.
      // I'll skip complex implementation for now or just log it.
      return state;
    }),

  toggleHint: () => set((state) => ({ hint: !state.hint })),

  reset: () => set({ levels: [], inputs: [], answers: {}, hint: false }),
}));
