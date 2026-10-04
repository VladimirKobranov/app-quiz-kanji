import React, { memo, useCallback, useState } from "react";
import { useStore } from "@/store/useStore";

import { Input } from "@/components/ui/input";
import KanjiHint from "@/components/KanjiHint";
import radicalData from "@/data/kanjidic-radicals.json";

const EMPTY_OBJ = {};
const INPUT_PLACEHOLDERS = {
  meaning: "meaning",
  "reading-on": "on",
  "reading-kun": "kun",
};

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
  const isLocked = cardStatus !== "idle";
  const [hintOpen, setHintOpen] = useState(false);

  const setInputValue = useStore((state) => state.setInputValue);
  const setCardStatus = useStore((state) => state.setCardStatus);

  const handleCardClick = useCallback((event) => {
    if (event.target.closest("input")) return;
    setHintOpen(true);
  }, []);

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

  const handleKeyDown = useCallback((_inputType, event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  }, []);

  const statusClasses = {
    idle: "bg-secondary text-muted-foreground",
    correct: "bg-primary text-primary-foreground",
    incorrect: "bg-destructive text-white",
  };

  return (
    <div
      onClick={hintState ? handleCardClick : undefined}
      className={`group flex flex-col gap-0.5 w-25 rounded-lg transition-all duration-300 shadow-sm border
        ${statusClasses[cardStatus]}
      `}
    >
      <div className="relative h-7.5 shrink-0">
        {hintState && (
          <div className="absolute right-2 top-1">
            <KanjiHint
              kanji={kanji}
              cardMeaning={data.meanings}
              cardOn={data.readings_on}
              cardKun={data.readings_kun}
              cardRadical={data.radical?.glyph || radicalData[kanji]?.glyph}
              cardStrokes={data.strokes}
              cardGrade={data.grade}
              cardFrequency={data.freq}
              cardJlpt={data.jlpt_new}
              status={cardStatus}
              open={hintOpen}
              onOpenChange={setHintOpen}
              trigger="card"
            />
          </div>
        )}
      </div>
      <div className="flex h-25 w-full items-center justify-center text-center">
        <span className="select-none -translate-y-2 cursor-pointer text-[60px] font-bold leading-none transition-transform duration-200 group-hover:scale-105 group-hover:brightness-125">
          {kanji}
        </span>
      </div>
      <div className="p-1 px-1.5 pb-2">
        <div className="flex flex-col gap-1">
          {inputs.map((inputType, index) => (
            <Input
              key={inputType + index}
              placeholder={INPUT_PLACEHOLDERS[inputType] || inputType}
              value={inputValues[inputType] || ""}
              disabled={isLocked}
              className={`w-full select-text text-center ${isLocked ? "border-none" : ""}`}
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
