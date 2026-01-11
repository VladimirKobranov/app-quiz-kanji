import React, { useEffect } from "react";
import KanjiCard from "@/components/KanjiCard";

import { useStore } from "@/store/useStore";
import InfoMessage from "@/components/InfoMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function ContentField() {
  const levels = useStore((state) => state.levels);
  const inputs = useStore((state) => state.inputs);
  const toggleHint = useStore((state) => state.toggleHint);
  const currentDeck = useStore((state) => state.currentDeck);

  const handleHintClick = () => {
    toggleHint();
    console.log("hint dispatch");
  };

  return (
    <div className="flex flex-col gap-0 h-full bg-background text-foreground">
      <div className="w-full h-[80px] md:h-[140px] flex items-center px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
          <p className="text-[18px] md:text-[30px] text-muted-foreground truncate">
            {levels.length
              ? "N" + levels.map((l) => parseInt(l, 10)).join(", N") // basic formatting
              : "Select level"}
          </p>
          <p className="text-[18px] md:text-[30px] text-muted-foreground/50 truncate">
            {inputs.length ? inputs.join(", ") : "Select inputs"}
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
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ContentField;
