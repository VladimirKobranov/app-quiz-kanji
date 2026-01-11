import { create } from "zustand";
import kanjiData from "@/data/kanji.json";

export const useStore = create((set, get) => ({
  levels: [],
  inputs: [],
  answers: {},
  hint: false,
  currentDeck: [],

  addLevel: (level) => {
    set((state) => ({ levels: [...state.levels, level] }));
    get().generateDeck();
  },
  removeLevel: (level) => {
    set((state) => ({ levels: state.levels.filter((l) => l !== level) }));
    get().generateDeck();
  },

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


  toggleHint: () => set((state) => ({ hint: !state.hint })),

  reset: () => set({ levels: [], inputs: [], answers: {}, hint: false, currentDeck: [] }),

  generateDeck: () => {
    const { levels } = get();
    // Parse levels to integers just like the component did
    const parsedLevels = levels.map((l) => parseInt(l, 10));
    
    // Filter kanji names based on JLPT level
    const allKanjiNames = Object.keys(kanjiData);
    const filteredNames = allKanjiNames.filter((name) => {
      const kData = kanjiData[name];
      return kData && parsedLevels.includes(kData.jlpt_new);
    });

    // Shuffle
    const shuffledNames = [...filteredNames];
    for (let i = shuffledNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
    }

    set({ currentDeck: shuffledNames });
  },

  validateAnswer: (kanji, value) => {
    const { inputs, addAnswer } = get();
    const data = kanjiData[kanji];
    if (!data) return false;

    const card = {
        meanings: data.meanings,
        readings_on: data.readings_on,
        readings_kun: data.readings_kun,
    };

    const trimmedValue = value.trim().toUpperCase();

    const isCorrectMeaning =
      inputs.includes("meaning") &&
      card.meanings.some((m) => m.toUpperCase() === trimmedValue);

    const isCorrectOn =
      inputs.includes("reading-on") &&
      card.readings_on.some((r) => r.toUpperCase() === trimmedValue);

    const isCorrectKun =
      inputs.includes("reading-kun") &&
      card.readings_kun.some((r) => r.toUpperCase() === trimmedValue);

    const isValid = isCorrectMeaning || isCorrectOn || isCorrectKun;

    addAnswer({
      kanji,
      input: value,
      correct: isCorrectMeaning,
      correctOn: isCorrectOn,
      correctKun: isCorrectKun,
      meaning: card.meanings.join(","),
      readingOn: card.readings_on, // Note: original code passed raw array/string mismatch potentially, keeping consistent
      readingKun: card.readings_kun,
    });

    return isValid;
  },
}));
