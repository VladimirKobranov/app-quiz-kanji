import React, { useState, memo, useCallback } from "react";
import { useStore } from "@/store/useStore";

import { Input } from "@/components/ui/input";
import KanjiHint from "@/components/KanjiHint";

const EMPTY_OBJ = {};

const KanjiCard = memo(function KanjiCard({ kanji }) {
  const inputs = useStore((state) => state.inputs);
  const hintState = useStore((state) => state.hint);
  const validateAnswer = useStore((state) => state.validateAnswer);

  // Use stable selector for data
  const data = useStore((state) => state.kanjiData[kanji]) || EMPTY_OBJ;

  // Use stable selector for inputs
  const inputValues =
    useStore((state) => state.inputValues[kanji]) || EMPTY_OBJ;
  const cardStatus = useStore((state) => state.cardStatuses[kanji] || "idle");

  const setInputValue = useStore((state) => state.setInputValue);
  const setCardStatus = useStore((state) => state.setCardStatus);

  const [keyEnter, setKeyEnter] = useState(false);

  /* New handler for validation on blur */
  const handleBlur = useCallback(
    (inputType, event) => {
      const v = event.target.value;
      if (!v) return;
      const valid = validateAnswer(kanji, v);
      setCardStatus(kanji, valid ? "correct" : "incorrect");
    },
    [kanji, validateAnswer, setCardStatus],
  );

  const handleChange = useCallback(
    (inputType, event) => {
      const v = event.target.value;
      setInputValue(kanji, inputType, v);
      // Validation removed from here
    },
    [kanji, setInputValue],
  );

  const handleKeyDown = useCallback(
    (inputType, event) => {
      if (event.key === "Enter") {
        setKeyEnter(true);
        const v = event.target.value;
        setInputValue(kanji, inputType, v);

        if (!v) return;
        const valid = validateAnswer(kanji, v);
        setCardStatus(kanji, valid ? "correct" : "incorrect");

        // Remove focus from input to trigger blur behavior visually if needed,
        // or just let the user stay there.
        // Usually pressing enter keeps focus, but validation shows result.
        event.target.blur();
      }
    },
    [kanji, validateAnswer, setInputValue, setCardStatus],
  );

  const statusClasses = {
    idle: "bg-secondary text-muted-foreground",
    correct: "bg-primary text-primary-foreground",
    incorrect: "bg-destructive text-white",
  };

  return (
    <div
      className={`flex flex-col gap-0.5 w-25 rounded-lg transition-all duration-300 shadow-sm border
        ${statusClasses[cardStatus]}
      `}
    >
      <div className="flex justify-end pr-2 pt-1 min-h-7.5">
        {hintState && (
          <KanjiHint
            kanji={kanji}
            cardMeaning={data.meanings}
            cardOn={data.readings_on}
            cardKun={data.readings_kun}
            status={cardStatus}
          />
        )}
      </div>
      <div className="h-25 flex items-center justify-center">
        <span className="text-[60px] font-bold select-none">{kanji}</span>
      </div>
      <div className="p-1 px-1.5 pb-2">
        <div className="flex flex-col gap-1">
          {inputs.map((inputType, index) => (
            <Input
              key={inputType + index}
              placeholder={inputType}
              value={inputValues[inputType] || ""}
              className={`h-[28px] w-full text-center rounded-md text-xs border-none shadow-none focus-visible:ring-1 focus-visible:ring-ring/50 bg-white/10 placeholder:text-current/50`}
              onChange={(event) => handleChange(inputType, event)}
              onBlur={(event) => handleBlur(inputType, event)}
              onKeyDown={(event) => handleKeyDown(inputType, event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default KanjiCard;
