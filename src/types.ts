export type FilterMode = "jlpt" | "grade" | "frequency";
export type SortMode = "random" | "strokes" | "frequency";
export type CardStatus = "idle" | "correct" | "incorrect";
export type QuizInput = "meaning" | "reading-on" | "reading-kun";

export interface KanjiData {
  strokes: number;
  grade: number;
  freq?: number;
  jlpt_new: number;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
  radical?: { glyph: string } | null;
  parts?: string[];
}

export interface Answer {
  kanji: string;
  input: string;
  correct: boolean;
  correctOn: boolean;
  correctKun: boolean;
  meaning: string;
  readingOn: string[];
  readingKun: string[];
}

export interface StoreState {
  levels: string[];
  filterMode: FilterMode;
  gradeFilters: number[];
  frequencyFilter: string;
  inputs: QuizInput[];
  answers: Record<string, Answer[]>;
  hint: boolean;
  sortMode: SortMode;
  currentDeck: string[];
  kanjiData: Record<string, KanjiData>;
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  inputValues: Record<string, Partial<Record<QuizInput, string>>>;
  cardStatuses: Record<string, CardStatus>;
  addLevel: (level: string) => void;
  removeLevel: (level: string) => void;
  toggleGradeFilter: (grade: number) => void;
  setFrequencyFilter: (filter: string) => void;
  setFilterMode: (mode: FilterMode) => void;
  addInput: (input: QuizInput) => void;
  removeInput: (input: QuizInput) => void;
  addAnswer: (answer: Answer) => void;
  setInputValue: (kanji: string, key: QuizInput, value: string) => void;
  setCardStatus: (kanji: string, status: CardStatus) => void;
  toggleHint: () => void;
  setSortMode: (mode: SortMode) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  reset: () => void;
  generateDeck: () => Promise<void>;
  validateAnswer: (kanji: string, value: string) => boolean;
}
