import React, { useState, memo, useCallback } from "react";
import { useStore } from "@/store/useStore";

import { Input } from "@/components/ui/input";
import KanjiHint from "@/components/KanjiHint";

const KanjiCard = memo(function KanjiCard({ kanji }) {
  const inputs = useStore((state) => state.inputs);
  const hintState = useStore((state) => state.hint);
  const validateAnswer = useStore((state) => state.validateAnswer);
  const data = useStore((state) => state.kanjiData[kanji] || {});

  const [status, setStatus] = useState("idle");
  const [keyEnter, setKeyEnter] = useState(false);

  const handleChange = useCallback(
    (event) => {
      const v = event.target.value;
      if (!v) return;
      const valid = validateAnswer(kanji, v);
      setStatus(valid ? "correct" : "incorrect");
    },
    [kanji, validateAnswer],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        setKeyEnter(true);
        const v = event.target.value;
        if (!v) return;
        const valid = validateAnswer(kanji, v);
        setStatus(valid ? "correct" : "incorrect");
      }
    },
    [kanji, validateAnswer],
  );

  const statusClasses = {
    idle: "bg-secondary text-muted-foreground",
    correct: "bg-primary text-primary-foreground",
    incorrect: "bg-destructive text-white",
  };

  return (
    <div
      className={`flex flex-col gap-0.5 w-25 rounded-lg transition-all duration-300 shadow-sm border
        ${statusClasses[status]}
      `}
    >
      <div className="flex justify-end pr-2 pt-1 min-h-7.5">
        {hintState && (
          <KanjiHint
            kanji={kanji}
            cardMeaning={data.meanings}
            cardOn={data.readings_on}
            cardKun={data.readings_kun}
            status={status}
          />
        )}
      </div>
      <div className="h-25 flex items-center justify-center">
        <span className="text-[60px] font-bold select-none">{kanji}</span>
      </div>
      <div className="p-1 px-1.5 pb-2">
        <div className="flex flex-col gap-1">
          {inputs.map((inputValue, index) => (
            <Input
              key={inputValue + index}
              placeholder={inputValue}
              className={`h-[28px] w-full text-center rounded-md text-xs border-none shadow-none focus-visible:ring-1 focus-visible:ring-ring/50 bg-white/10 placeholder:text-current/50`}
              onBlur={(event) => (keyEnter ? null : handleChange(event))}
              onKeyDown={handleKeyDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default KanjiCard;
