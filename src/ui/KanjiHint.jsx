import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

function KanjiHint({ kanji, cardMeaning, cardOn, cardKun }) {
  return (
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
            <span className="text-4xl font-bold">{kanji}</span>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="font-bold opacity-70">Meaning:</span>{" "}
              {cardMeaning?.join(", ") || "-"}
            </p>
            <p>
              <span className="font-bold opacity-70">Onyomi:</span>{" "}
              {cardOn?.join(", ") || "-"}
            </p>
            <p>
              <span className="font-bold opacity-70">Kunyomi:</span>{" "}
              {cardKun?.join(", ") || "-"}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default KanjiHint;
