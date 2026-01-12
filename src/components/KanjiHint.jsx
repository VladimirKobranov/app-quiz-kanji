import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function KanjiHint({ kanji, cardMeaning, cardOn, cardKun, status = "idle" }) {
  const statusClasses = {
    idle: "bg-secondary text-muted-foreground",
    correct: "bg-primary text-primary-foreground",
    incorrect: "bg-destructive text-white",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`size-5 rounded-full p-0 hover:bg-primary hover:text-primary-foreground text-xs font-medium transition-colors ${statusClasses[status]}`}
        >
          ?
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-0 overflow-hidden rounded-xl border border-border shadow-lg"
        sideOffset={8}
      >
        <div className="flex">
          {/* Kanji display section */}
          <div className="bg-primary text-primary-foreground p-4 flex flex-col items-center justify-center min-w-[80px]">
            <span className="text-4xl font-bold tracking-tight">{kanji}</span>
            <span className="text-[10px] uppercase tracking-widest mt-1 opacity-70">
              漢字
            </span>
          </div>

          {/* Info section */}
          <div className="flex-1 p-4 space-y-3 bg-popover">
            <InfoRow label="Meaning" value={cardMeaning} labelJp="意味" />
            <InfoRow
              label="Onyomi"
              value={cardOn}
              labelJp="音読み"
              className="text-foreground/90"
            />
            <InfoRow
              label="Kunyomi"
              value={cardKun}
              labelJp="訓読み"
              className="text-foreground/90"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function InfoRow({ label, labelJp, value, className }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <span className="text-[9px] text-muted-foreground/60">{labelJp}</span>
      </div>
      <p
        className={cn("text-sm font-medium text-popover-foreground", className)}
      >
        {value?.join(", ") || "—"}
      </p>
    </div>
  );
}

export default KanjiHint;
