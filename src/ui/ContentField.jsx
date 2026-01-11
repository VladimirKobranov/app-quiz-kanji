import React, { useEffect } from "react";
import KanjiCard from "./KanjiCard";

import { useStore } from "../store/useStore";
import InfoMessage from "./InfoMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function ContentField() {
  const levels = useStore((state) => state.levels);
  const inputs = useStore((state) => state.inputs);
  const toggleHint = useStore((state) => state.toggleHint);
  const currentDeck = useStore((state) => state.currentDeck);
  const generateDeck = useStore((state) => state.generateDeck);

  const handleHintClick = () => {
    toggleHint();
    console.log("hint dispatch");
  };

  // Ensure deck is generated when mounted if levels exist
  // or just rely on addLevel/removeLevel to have triggered it.
  // But on refresh, levels might be empty or persisted?
  // If useStore is not persisted, levels are empty initially.
  // currentDeck should seek to reflect levels.
  
  // Actually, if we just rely on add/remove level actions, we might miss initial load if state was persisted (though it's not currently configured for persist).
  // But let's assume we want to ensure deck is consistent.
  // The `generateDeck` was added to `addLevel` and `removeLevel`, so it should be fine.
  // However, on first render if we had persisted state, we might need to trigger it? 
  // For now, let's assume standard behavior as before.
  
  // Note: The previous logic also generated shuffled names on every render or useEffect?
  // Previous: useEffect on levelsFromRedux -> setJlptLevelFilter -> used in shuffle logic.
  // The shuffle happened on every render in the previous code?
  // "const shuffledNames = [...filteredNames]; for (...) ..." was in the body.
  // So it reshuffled on every render! That fits "flash card" but might be annoying if it reorders while you type?
  // No, because Input typing doesn't trigger ContentField re-render unless inputsFromRedux changes?
  // Wait, `inputsFromRedux` is in useStore. Typing in KanjiCard is local state in KanjiCard.
  // So ContentField didn't re-render on typing.
  
  // ANYWAY, now `currentDeck` is in store. It only changes when `generateDeck` is called.
  // This is better for stability.

  // We need data for cards (meanings, on, kun).
  // previously passed `data[name].meanings` etc to KanjiCard.
  // data was local state.
  // Now KanjiCard needs to get data itself or we pass it?
  // Store has `kanjiData` internally but doesn't expose it to components easily unless we add a selector or pass it.
  // `KanjiCard` can use `useStore` to validate, but it needs to display hints?
  // `KanjiCard` props: `cardMeaning`, `cardOn`, `cardKun` were passed for hints.
  // I should probably export `kanjiData` from store or just import it in `KanjiCard` logic too?
  // Or better, let `KanjiCard` retrieve it from store actions or just import json directly?
  // Importing JSON directly in component is fine if store uses it too.
  // But duplication of source of truth?
  // Let's pass the data from `currentDeck` if we can.
  // `currentDeck` is just names.
  // ContentField doesn't have `kanjiData` anymore.
  // So I should import `kanjiData` here to pass props, OR let KanjiCard import it.
  // If I let KanjiCard import it, I don't need to pass it.
  // Let's import it here to pass it, minimizing changes to KanjiCard for now (although I planned to refactor KanjiCard too).
  // Actually, `KanjiCard` uses props heavily.
  // Let's import kanjiData here just to pass the props, to keep visual logic same.
  
  return (
    <div className="flex flex-col gap-0 h-full bg-background text-foreground">
      <div className="w-full h-[80px] md:h-[140px] flex items-center px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
          <p className="text-[18px] md:text-[30px] text-muted-foreground truncate">
            {levels.length
              ? "N" + levels.map(l => parseInt(l, 10)).join(", N") // basic formatting
              : "Select level"}
          </p>
          <p className="text-[18px] md:text-[30px] text-muted-foreground/50 truncate">
            {inputs.length
              ? inputs.join(", ")
              : "Select inputs"}
          </p>
          {levels.length > 0 && (
            <p className="text-[14px] md:text-[20px] text-muted-foreground/60 truncate">
              {currentDeck.length} kanji for this level
            </p>
          )}
          {levels.length !== 0 && (
            <div className="md:hidden fixed top-[20px] right-[90px] z-40">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleHintClick}
                className="text-[24px] h-[60px] w-[60px] rounded-full shadow-sm"
              >
                ?
              </Button>
            </div>
          )}
        </div>
      </div>
      <ScrollArea className={`w-full flex-1 overflow-scroll overflow-x-hidden`}>
        {levels.length === 0 ? (
          <InfoMessage />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2.5 gap-y-7.5 p-4">
            {currentDeck.map((name, index) => (
               <KanjiCard
                key={name + index} // simple key
                kanji={name}
                // We are removing specific props for data, KanjiCard will fetch it or we change KanjiCard to import json.
                // Let's decide: KanjiCard refactor is next. I'll make KanjiCard import kanjiData itself or use a store selector?
                // Using store selector for data of one item is weird if data isn't in state. 
                // I will modify KanjiCard to import kanjiData directly.
               />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ContentField;
