# Kanji Quiz Development Roadmap

> **Project Overview**: Interactive React-based kanji learning application targeting JLPT levels N5-N1

## ⚡ **PHASE 2: CODE QUALITY & TYPE SAFETY**

### 2.1 TypeScript Migration

**Issue**: Entire codebase in JavaScript - runtime errors, poor IDE support
**Solution**: Gradual TypeScript adoption

```typescript
// src/types/kanji.ts
export interface KanjiData {
  stroke_count: number;
  grade: number | null;
  frequency: number | null;
  jlpt_old: number | null;
  jlpt_new: number;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
}

export interface QuizState {
  kanji: string;
  input: string;
  correct: boolean;
  correctOn?: boolean;
  correctKun?: boolean;
  meaning: string;
  readingOn: string[];
  readingKun: string[];
}

// src/store/useStore.ts
interface StoreState {
  levels: string[];
  inputs: string[];
  answers: Record<string, QuizState[]>;
  hint: boolean;
  currentDeck: string[];
  // ... methods
}
```

**Migration Order**:

1. `src/types/` - Define core interfaces
2. `src/store/useStore.js` → `useStore.ts`
3. Core components (`KanjiCard`, `ContentField`)
4. Remaining components

### 2.2 ESLint & Prettier Configuration

**Issue**: Basic linting only, inconsistent code style
**Solution**: Comprehensive linting setup

```json
// .eslintrc.json
{
  "extends": ["react-app", "react-app/jest", "@typescript-eslint/recommended"],
  "rules": {
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### 2.3 Data Persistence

**Issue**: Progress lost on page refresh
**Solution**: localStorage integration

```javascript
// src/store/useStore.js
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // ... existing store
    }),
    {
      name: "kanji-quiz-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        levels: state.levels,
        inputs: state.inputs,
      }),
    },
  ),
);
```

---

## 🚀 **PHASE 3: ADVANCED LEARNING FEATURES**

### 3.2 Progress Analytics Dashboard
