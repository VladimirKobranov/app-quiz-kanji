import React, { useState } from "react";
import style from "../css/KanjiCard.module.css";
import { useStore } from "../store/useStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function KanjiCard(props) {
  const inputsFromRedux = useStore((state) => state.inputs);
  const hintState = useStore((state) => state.hint);

  const [status, setStatus] = useState("idle");
  const [keyEnter, setKeyEnter] = useState(false);

  const handleChange = (event) => {
    const v = event.target.value;
    if (!v) return;
    let valid = props.validation(props.kanji, v);
    setStatus(valid ? "correct" : "incorrect");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setKeyEnter(true);
      const v = event.target.value;
      if (!v) return;
      let valid = props.validation(props.kanji, v);
      setStatus(valid ? "correct" : "incorrect");
    }
  };

  const statusClasses = {
    idle: "bg-secondary text-muted-foreground",
    correct: "bg-primary text-primary-foreground",
    incorrect: "bg-destructive text-destructive-foreground",
  };

  return (
    <div
      className={`flex flex-col gap-0.5 w-[100px] rounded-lg transition-all duration-300 shadow-sm border
        ${statusClasses[status]}
      `}
    >
      <div className="flex justify-end pr-2 pt-1 min-h-[30px]">
        {hintState && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full p-0 bg-muted/50 hover:bg-muted text-[10px]"
              >
                ?
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 overflow-hidden border-none shadow-xl">
              <div className="bg-primary text-primary-foreground px-4 py-2">
                <h4 className="font-bold">Kanji Hint</h4>
              </div>
              <div className="p-4 flex gap-4 bg-popover text-popover-foreground">
                <div className="bg-muted p-2 rounded-md flex items-center justify-center min-w-[60px]">
                  <span className="text-4xl font-bold">{props.kanji}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <p>
                    <span className="font-bold opacity-70">Meaning:</span>{" "}
                    {props.cardMeaning.join(", ")}
                  </p>
                  <p>
                    <span className="font-bold opacity-70">Onyomi:</span>{" "}
                    {props.cardOn.join(", ")}
                  </p>
                  <p>
                    <span className="font-bold opacity-70">Kunyomi:</span>{" "}
                    {props.cardKun.join(", ")}
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className="h-[100px] flex items-center justify-center">
        <span className="text-[60px] font-bold select-none">{props.kanji}</span>
      </div>
      <div className="p-1 px-1.5 pb-2">
        <div className="flex flex-col gap-1">
          {inputsFromRedux.map((inputValue, index) => (
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
}

export default KanjiCard;
