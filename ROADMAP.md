# Kanji Quiz Development Roadmap

> **Project Overview**: Interactive React-based kanji learning application targeting JLPT levels N5-N1
>
> **Current Status**: v0.3.0 - Functional prototype with solid foundation but significant optimization opportunities
>
> **Bundle Size**: 3.6MB (needs optimization) | **Data Size**: 4.8MB kanji.json | **Tech Stack**: React 18 + Vite + Tailwind + Zustand

---

## 🚨 **PHASE 1: CRITICAL PERFORMANCE & STABILITY (Week 1)**

### **Priority: HIGH - Immediate Impact on User Experience**

#### 1.1 Bundle Size Optimization

**Issue**: 3.6MB bundle causing slow initial loads, especially on mobile
**Solution**: Implement code splitting for kanji data

```javascript
// Create src/data/loader.js
export const loadKanjiData = async (levels) => {
  // Dynamic import based on selected levels
  const kanjiModules = await Promise.all(
    levels.map((level) => import(`./kanji-${level}.json`)),
  );

  return kanjiModules.reduce((acc, module, index) => {
    return { ...acc, ...module.default };
  }, {});
};

// Update useStore.js generateDeck function
generateDeck: async () => {
  const { levels } = get();
  if (!levels.length) return set({ currentDeck: [] });

  // Load only required kanji data
  const kanjiData = await loadKanjiData(levels);
  const parsedLevels = levels.map((l) => parseInt(l, 10));

  // Process and shuffle...
};
```

**Files to modify**:

- `vite.config.js` - Add manual chunk configuration
- `src/store/useStore.js` - Async deck generation
- Create `src/data/loader.js` - Dynamic data loading

**Expected Impact**: 80% reduction in initial bundle size

#### 1.2 React Performance Optimization

**Issue**: Unnecessary re-renders across all components
**Solution**: Implement memoization patterns

```jsx
// src/components/KanjiCard.jsx
import React, { memo, useCallback } from "react";

const KanjiCard = memo(function KanjiCard({ kanji }) {
  const inputs = useStore((state) => state.inputs);
  const hintState = useStore((state) => state.hint);
  const validateAnswer = useStore((state) => state.validateAnswer);

  const handleChange = useCallback(
    (event) => {
      const v = event.target.value;
      if (!v) return;
      validateAnswer(kanji, v);
    },
    [kanji, validateAnswer],
  );

  // Rest of component...
});

export default KanjiCard;
```

**Files to modify**:

- `src/components/KanjiCard.jsx`
- `src/components/ContentField.jsx`
- `src/components/ChooseLevel.jsx`
- `src/components/ChooseInputs.jsx`

#### 1.3 Error Boundary Implementation

**Issue**: No error handling - app crashes on malformed data
**Solution**: Add React error boundaries

```jsx
// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2>Something went wrong.</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Files to create/modify**:

- Create `src/components/ErrorBoundary.jsx`
- Wrap `<Main />` in `App.jsx`

#### 1.4 Code Cleanup

**Issue**: Debug code and inconsistencies
**Tasks**:

- Remove `console.log("hint dispatch")` from `ContentField.jsx:17`
- Standardize variable naming conventions
- Extract magic numbers to constants

---

## ⚡ **PHASE 2: CODE QUALITY & TYPE SAFETY (Week 2-3)**

### **Priority: HIGH - Long-term Maintainability**

#### 2.1 TypeScript Migration

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

#### 2.2 Testing Infrastructure Setup

**Issue**: Zero test coverage - high regression risk
**Solution**: Jest + React Testing Library setup

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event @vitest/ui vitest
```

**Test files to create**:

- `src/components/__tests__/KanjiCard.test.tsx`
- `src/components/__tests__/ContentField.test.tsx`
- `src/store/__tests__/useStore.test.ts`

**Example test**:

```tsx
// src/components/__tests__/KanjiCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import KanjiCard from "../KanjiCard";
import { useStore } from "../../store/useStore";

// Mock the store
jest.mock("../../store/useStore");

describe("KanjiCard", () => {
  it("should render kanji character", () => {
    (useStore as jest.Mock).mockReturnValue({
      inputs: ["meaning"],
      hint: false,
      validateAnswer: jest.fn(),
    });

    render(<KanjiCard kanji="日" />);
    expect(screen.getByText("日")).toBeInTheDocument();
  });

  it("should validate answer on input change", () => {
    const mockValidate = jest.fn();
    (useStore as jest.Mock).mockReturnValue({
      inputs: ["meaning"],
      hint: false,
      validateAnswer: mockValidate,
    });

    render(<KanjiCard kanji="日" />);
    const input = screen.getByPlaceholderText("meaning");

    fireEvent.change(input, { target: { value: "day" } });
    expect(mockValidate).toHaveBeenCalledWith("日", "day");
  });
});
```

#### 2.3 ESLint & Prettier Configuration

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

#### 2.4 Data Persistence

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
        // Don't persist answers or currentDeck
      }),
    },
  ),
);
```

---

## 🎯 **PHASE 3: ACCESSIBILITY & UX IMPROVEMENTS (Week 3-4)**

### **Priority: MEDIUM - User Experience Enhancement**

#### 3.1 Accessibility Improvements

**Issue**: Poor screen reader support, limited keyboard navigation
**Solution**: Comprehensive ARIA implementation

```jsx
// Enhanced KanjiCard with accessibility
<div
  role="article"
  aria-label={`Kanji character ${props.kanji}, status: ${status}`}
  className={`flex flex-col gap-0.5 w-25 rounded-lg transition-all duration-300 shadow-sm border
    ${statusClasses[status]}
  `}
>
  {inputs.map((inputValue, index) => (
    <Input
      key={inputValue + index}
      placeholder={inputValue}
      aria-label={`${inputValue} for kanji ${props.kanji}`}
      aria-describedby={`hint-${props.kanji}`}
      className={`h-[28px] w-full text-center rounded-md text-xs border-none shadow-none focus-visible:ring-1 focus-visible:ring-ring/50 bg-white/10 placeholder:text-current/50`}
      onBlur={(event) => (keyEnter ? null : handleChange(event))}
      onKeyDown={handleKeyDown}
    />
  ))}
</div>
```

#### 3.2 Enhanced Keyboard Navigation

**Issue**: Only Enter key supported
**Solution**: Full keyboard support

```jsx
// Enhanced keyboard handling
const handleKeyDown = (event) => {
  switch (event.key) {
    case "Enter":
      handleValidation(event);
      break;
    case "Tab":
      // Focus next input
      event.preventDefault();
      const nextInput = event.target.form?.elements[index + 1];
      if (nextInput) nextInput.focus();
      break;
    case "ArrowUp":
    case "ArrowDown":
      // Navigate between cards
      event.preventDefault();
      navigateCard(event.key === "ArrowUp" ? -1 : 1);
      break;
  }
};
```

#### 3.3 Loading States & Skeletons

**Issue**: No feedback during data processing
**Solution**: Skeleton screens and loading indicators

```jsx
// src/components/KanjiSkeleton.jsx
const KanjiSkeleton = () => (
  <div className="flex flex-col gap-0.5 w-25 rounded-lg bg-muted animate-pulse">
    <div className="h-25 flex items-center justify-center">
      <div className="w-16 h-16 bg-muted-foreground/20 rounded"></div>
    </div>
    <div className="p-1 px-1.5 pb-2 space-y-1">
      <div className="h-[28px] bg-muted-foreground/20 rounded"></div>
    </div>
  </div>
);

// Use in ContentField.jsx
{isLoading ? (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2.5 gap-y-7.5 p-4">
    {Array.from({ length: 12 }).map((_, i) => (
      <KanjiSkeleton key={i} />
    ))}
  </div>
) : (
  // Regular content
)}
```

---

## 🚀 **PHASE 4: ADVANCED LEARNING FEATURES (Week 4-6)**

### **Priority: MEDIUM - Feature Enhancement**

#### 4.1 Spaced Repetition Algorithm

**Issue**: No learning optimization, random order only
**Solution**: Implement SM-2 algorithm

```javascript
// src/utils/spacedRepetition.js
export class SpacedRepetitionCard {
  constructor(kanji) {
    this.kanji = kanji;
    this.easeFactor = 2.5;
    this.interval = 1;
    this.repetitions = 0;
    this.nextReview = Date.now();
    this.lastReviewed = null;
  }

  update(quality) {
    // SM-2 Algorithm implementation
    this.repetitions += 1;

    if (quality < 3) {
      this.repetitions = 0;
      this.interval = 1;
    } else {
      if (this.repetitions === 1) {
        this.interval = 1;
      } else if (this.repetitions === 2) {
        this.interval = 6;
      } else {
        this.interval = Math.round(this.interval * this.easeFactor);
      }
    }

    this.easeFactor = Math.max(
      1.3,
      this.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    );

    this.lastReviewed = Date.now();
    this.nextReview = this.lastReviewed + this.interval * 24 * 60 * 60 * 1000;
  }
}
```

#### 4.2 Progress Analytics Dashboard

**Issue**: No learning insights or progress tracking
**Solution**: Statistics and analytics

```jsx
// src/components/Analytics.jsx
const Analytics = () => {
  const { answers } = useStore();

  const stats = useMemo(() => {
    const totalAnswers = Object.values(answers).flat();
    const correct = totalAnswers.filter((a) => a.correct).length;
    const accuracy = totalAnswers.length
      ? ((correct / totalAnswers.length) * 100).toFixed(1)
      : 0;

    return {
      totalKanji: Object.keys(answers).length,
      totalAnswers: totalAnswers.length,
      correct,
      accuracy: `${accuracy}%`,
      streak: calculateStreak(totalAnswers),
      weakPoints: identifyWeakPoints(totalAnswers),
    };
  }, [answers]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Metric label="Kanji Learned" value={stats.totalKanji} />
          <Metric label="Total Answers" value={stats.totalAnswers} />
          <Metric label="Accuracy" value={stats.accuracy} />
          <Metric label="Current Streak" value={stats.streak} />
        </div>
      </CardContent>
    </Card>
  );
};
```

#### 4.3 Audio Pronunciation

**Issue**: No audio support for readings
**Solution**: Text-to-speech integration

```jsx
// src/components/AudioButton.jsx
const AudioButton = ({ text, language = "ja-JP" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.8;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);

      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={playAudio} disabled={isPlaying}>
      {isPlaying ? "🔊" : "🔇"}
    </Button>
  );
};
```

---

## 🔧 **PHASE 5: INFRASTRUCTURE & DEVOPS (Week 5-6)**

### **Priority: LOW - Developer Experience**

#### 5.1 CI/CD Pipeline

**Issue**: Manual deployment process
**Solution**: GitHub Actions automation

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

#### 5.2 Component Documentation

**Issue**: No component documentation
**Solution**: Storybook integration

```bash
npm install --save-dev @storybook/react @storybook/addon-essentials
```

```jsx
// .storybook/stories/KanjiCard.stories.js
import KanjiCard from "../src/components/KanjiCard";

export default {
  title: "Components/KanjiCard",
  component: KanjiCard,
};

const Template = (args) => <KanjiCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  kanji: "日",
};

export const Correct = Template.bind({});
Correct.args = {
  kanji: "日",
  // Mock store to show correct state
};
```

---

## 📊 **SUCCESS METRICS & KPIs**

### **Performance Targets**

- **Initial Load Time**: < 2 seconds on 3G
- **Bundle Size**: < 500KB gzipped
- **Time to Interactive**: < 3 seconds
- **Lighthouse Score**: 90+ across all categories

### **User Engagement Targets**

- **Session Duration**: 15+ minutes average
- **Retention Rate**: 70% return within 7 days
- **Learning Progress**: 10+ kanji per session average

### **Development Quality Targets**

- **Test Coverage**: 80%+ for critical paths
- **TypeScript Adoption**: 100% core components
- **Build Time**: < 30 seconds
- **Zero Critical Bugs** in production

---

## 🛠️ **IMPLEMENTATION GUIDELINES**

### **Development Workflow**

1. **Create feature branch** for each phase item
2. **Write tests before implementation** (TDD approach)
3. **Run bundle analyzer** after performance changes
4. **Deploy to staging** for user testing
5. **Monitor performance** metrics in production

### **Code Review Checklist**

- [ ] TypeScript types are properly defined
- [ ] Components use `React.memo` where appropriate
- [ ] Accessibility attributes are included
- [ ] Tests cover happy path and edge cases
- [ ] Bundle size impact is measured
- [ ] Performance regression tests pass

### **Testing Strategy**

- **Unit Tests**: Component logic, store functions
- **Integration Tests**: User flows, data persistence
- **E2E Tests**: Critical user journeys (optional)
- **Performance Tests**: Bundle analysis, load time
- **Accessibility Tests**: Screen reader compatibility

---

## 📅 **DEADLINE & MILESTONES**

| Phase   | Duration | Target Date | Key Deliverables                          |
| ------- | -------- | ----------- | ----------------------------------------- |
| Phase 1 | 1 week   | Week 1      | 80% bundle reduction, React optimizations |
| Phase 2 | 2 weeks  | Week 3      | TypeScript migration, test coverage 80%   |
| Phase 3 | 1 week   | Week 4      | Full accessibility compliance             |
| Phase 4 | 2 weeks  | Week 6      | Advanced learning features                |
| Phase 5 | 1 week   | Week 7      | CI/CD pipeline, documentation             |

**Total Timeline**: 7 weeks to production-ready application

---

## 🎯 **IMMEDIATE NEXT STEPS**

1. **Today**: Create feature branch for Phase 1.1 (bundle optimization)
2. **This Week**: Implement dynamic kanji data loading
3. **Next Week**: Add React.memo to all components
4. **Following Week**: Begin TypeScript migration

---

## 📝 **NOTES & CONSIDERATIONS**

### **Risk Mitigation**

- **Data Migration**: Backup kanji.json before splitting
- **Backward Compatibility**: Maintain fallback for existing users
- **Performance Testing**: Monitor after each optimization
- **User Feedback**: Test with actual Japanese learners

### **Future Expansion Opportunities**

- **WaniKani Integration**: Sync with popular learning platform
- **Mobile App**: React Native implementation
- **Social Features**: Leaderboards, study groups
- **AI Tutoring**: ChatGPT integration for personalized learning
- **Offline Support**: Service worker implementation

---

**Last Updated**: January 12, 2026  
**Version**: 1.0  
**Next Review**: End of Phase 1 (Week 1)

This roadmap provides a clear, actionable path to transform the kanji-quiz prototype into a production-ready, high-performance learning application. Each phase builds upon the previous one, with measurable outcomes and success criteria.
