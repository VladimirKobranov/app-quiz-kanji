import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadKanjiData } from "@/data/loader";

export const useStore = create(
  persist(
    (set, get) => ({
      levels: [],
      inputs: [],
      answers: {},
      hint: false,
      currentDeck: [],
      kanjiData: {},
      loading: false,
      currentPage: 1,
      itemsPerPage: 100,
      inputValues: {}, // { [kanji]: { [key]: value } }
      cardStatuses: {}, // { [kanji]: "idle" | "correct" | "incorrect" }

      addLevel: (level) => {
        set((state) => ({ levels: [...state.levels, level] }));
        get().generateDeck();
      },
      removeLevel: (level) => {
        set((state) => ({ levels: state.levels.filter((l) => l !== level) }));
        get().generateDeck();
      },

      addInput: (input) =>
        set((state) => ({ inputs: [...state.inputs, input] })),
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

      setInputValue: (kanji, key, value) =>
        set((state) => ({
          inputValues: {
            ...state.inputValues,
            [kanji]: {
              ...(state.inputValues[kanji] || {}),
              [key]: value,
            },
          },
        })),

      setCardStatus: (kanji, status) =>
        set((state) => ({
          cardStatuses: {
            ...state.cardStatuses,
            [kanji]: status,
          },
        })),

      toggleHint: () => set((state) => ({ hint: !state.hint })),

      setCurrentPage: (page) => set({ currentPage: page }),
      setItemsPerPage: (count) => set({ itemsPerPage: count }),

      reset: () =>
        set({
          levels: [],
          inputs: [],
          answers: {},
          hint: false,
          currentDeck: [],
          kanjiData: {},
          currentPage: 1,
          inputValues: {},
          cardStatuses: {},
        }),

      generateDeck: async () => {
        const { levels } = get();
        if (!levels.length) {
          return set({ currentDeck: [], kanjiData: {}, currentPage: 1 });
        }

        set({ loading: true });

        try {
          // Load only required kanji data
          const data = await loadKanjiData(levels);
          const parsedLevels = levels.map((l) => parseInt(l, 10));

          // Filter kanji names based on JLPT level
          const allKanjiNames = Object.keys(data);
          const filteredNames = allKanjiNames.filter((name) => {
            const kData = data[name];
            return kData && parsedLevels.includes(kData.jlpt_new);
          });

          // Shuffle
          const shuffledNames = [...filteredNames];
          for (let i = shuffledNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNames[i], shuffledNames[j]] = [
              shuffledNames[j],
              shuffledNames[i],
            ];
          }

          set({
            currentDeck: shuffledNames,
            kanjiData: data,
            currentPage: 1,
            loading: false,
          });
        } catch (error) {
          console.error("Failed to load kanji data:", error);
          set({ loading: false });
        }
      },

      validateAnswer: (kanji, value) => {
        const { inputs, addAnswer, kanjiData } = get();
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
          readingOn: card.readings_on,
          readingKun: card.readings_kun,
        });

        return isValid;
      },
    }),
    {
      name: "kanji-quiz-storage", // unique name
      partialize: (state) => ({
        levels: state.levels,
        inputs: state.inputs,
        answers: state.answers,
        hint: state.hint,
        currentDeck: state.currentDeck,
        kanjiData: state.kanjiData,
        inputValues: state.inputValues,
        cardStatuses: state.cardStatuses,
        currentPage: state.currentPage,
        itemsPerPage: state.itemsPerPage,
      }),
    },
  ),
);
