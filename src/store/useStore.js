import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadKanjiData } from "@/data/loader";

export const useStore = create(
  persist(
    (set, get) => ({
      levels: [],
      filterMode: "jlpt",
      gradeFilters: [],
      frequencyFilter: "all",
      inputs: [],
      answers: {},
      hint: false,
      sortMode: "random",
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

      toggleGradeFilter: (grade) => {
        set((state) => ({
          gradeFilters: state.gradeFilters.includes(grade)
            ? state.gradeFilters.filter((value) => value !== grade)
            : [...state.gradeFilters, grade],
        }));
        get().generateDeck();
      },

      setFrequencyFilter: (frequencyFilter) => {
        set({ frequencyFilter });
        get().generateDeck();
      },

      setFilterMode: (filterMode) => {
        set({ filterMode });
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

      setSortMode: (sortMode) => {
        set({ sortMode });
        get().generateDeck();
      },

      setCurrentPage: (page) => set({ currentPage: page }),
      setItemsPerPage: (count) => set({ itemsPerPage: count }),

      reset: () =>
        set({
          levels: [],
          filterMode: "jlpt",
          inputs: [],
          gradeFilters: [],
          frequencyFilter: "all",
          answers: {},
          hint: false,
          currentDeck: [],
          kanjiData: {},
          currentPage: 1,
          inputValues: {},
          cardStatuses: {},
        }),

      generateDeck: async () => {
        const { levels, filterMode } = get();
        if (filterMode === "jlpt" && !levels.length) {
          return set({ currentDeck: [], kanjiData: {}, currentPage: 1 });
        }

        set({ loading: true });

        try {
          // Load only required kanji data
          const data = await loadKanjiData(
            filterMode === "jlpt" ? levels : ["1", "2", "3", "4", "5"],
          );
          const parsedLevels = levels.map((l) => parseInt(l, 10));

          // Filter kanji names based on JLPT level
          const allKanjiNames = Object.keys(data);
          const { gradeFilters, frequencyFilter } = get();
          const filteredNames = allKanjiNames.filter((name) => {
            const kData = data[name];
            if (!kData) return false;
            if (
              filterMode === "jlpt" &&
              !parsedLevels.includes(kData.jlpt_new)
            ) {
              return false;
            }
            if (filterMode === "grade" && !gradeFilters.includes(kData.grade)) {
              return false;
            }
            if (filterMode === "frequency" && frequencyFilter === "rare")
              return !kData.freq || kData.freq > 3000;
            if (filterMode === "frequency" && frequencyFilter !== "all") {
              const limit = Number(frequencyFilter.replace("top-", ""));
              if (!kData.freq || kData.freq > limit) return false;
            }
            return true;
          });

          const shuffledNames = [...filteredNames];
          const { sortMode } = get();
          if (sortMode === "strokes") {
            shuffledNames.sort((a, b) => data[a].strokes - data[b].strokes);
          } else if (sortMode === "frequency") {
            shuffledNames.sort(
              (a, b) => (data[a].freq ?? Infinity) - (data[b].freq ?? Infinity),
            );
          } else if (sortMode === "random") {
            for (let i = shuffledNames.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffledNames[i], shuffledNames[j]] = [
                shuffledNames[j],
                shuffledNames[i],
              ];
            }
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
        filterMode: state.filterMode,
        gradeFilters: state.gradeFilters,
        frequencyFilter: state.frequencyFilter,
        inputs: state.inputs,
        answers: state.answers,
        hint: state.hint,
        sortMode: state.sortMode,
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
