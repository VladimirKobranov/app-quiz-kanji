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

  const [color, setColor] = useState("#E6E1E7");
  const [keyEnter, setKeyEnter] = useState(false);

  const handleChange = (event, index) => {
    const v = event.target.value;
    if (!v) return;
    let valid = props.validation(props.kanji, v);
    if (valid) {
      setColor("#014A77");
    } else {
      setColor("#AF282F");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setKeyEnter(true);
      const v = event.target.value;
      if (!v) return;
      let valid = props.validation(props.kanji, v);
      if (valid) {
        setColor("#014A77");
      } else {
        setColor("#AF282F");
      }
    }
  };

  return (
    <div
      className="flex flex-col gap-0.5 w-[100px] rounded-sm transition-colors duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-end pr-2.5 pt-1.25 min-h-[30px]">
        {hintState && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-5 w-5 rounded-full p-0 bg-[#C2BCC1] text-xs hover:bg-[#b0adb1]"
              >
                ?
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 border-none shadow-lg">
              <div className="rounded-md overflow-hidden bg-white">
                <div className="flex justify-between items-center bg-[#014A77] text-white px-3 py-2">
                  <h4 className="font-bold text-lg">Hint</h4>
                </div>
                <div className="p-4 flex gap-4">
                  <div className="bg-[#f3f4f6] p-2 rounded flex items-center justify-center min-w-[60px]">
                    <span className={`${style.hintHeaderKanji} text-4xl`}>
                      {props.kanji}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <p>
                      <span className="font-bold mr-1">Meaning:</span>{" "}
                      {props.cardMeaning.join(", ")}
                    </p>
                    <p>
                      <span className="font-bold mr-1">Onyomi:</span>{" "}
                      {props.cardOn.join("、 ")}
                    </p>
                    <p>
                      <span className="font-bold mr-1">Kunyomi:</span>{" "}
                      {props.cardKun.join("、")}
                    </p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div
        className={`${style.CardKanji} h-[100px] flex items-center justify-center`}
      >
        <span className="text-[80px]" style={{ color: props.textCol }}>
          {props.kanji}
        </span>
      </div>
      <div className={`${style.CardText} h-auto rounded-sm p-1.5 pt-0`}>
        <div className="flex flex-col gap-0.5 items-center">
          {inputsFromRedux.map((inputValue, index) => (
            <Input
              key={inputValue + index}
              placeholder={inputValue}
              className={`h-[29px] w-[90px] text-center rounded-sm text-sm border-none shadow-none focus-visible:ring-0 ${style.CardText}`}
              style={{ backgroundColor: color, color: props.textCol }}
              onBlur={(event) => (keyEnter ? null : handleChange(event, index))}
              onKeyDown={handleKeyDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default KanjiCard;
