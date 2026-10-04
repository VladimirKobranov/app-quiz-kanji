import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function KanjiHint({
  kanji,
  cardMeaning,
  cardOn,
  cardKun,
  cardRadical,
  cardStrokes,
  cardGrade,
  cardFrequency,
  cardJlpt,
  status = "idle",
}) {
  const statusClasses = {
    idle: "bg-secondary text-muted-foreground",
    correct: "bg-primary text-primary-foreground",
    incorrect: "bg-destructive text-white",
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          tabIndex={-1}
          variant="ghost"
          size="icon"
          className={`size-5 rounded-full p-0 hover:bg-primary hover:text-primary-foreground text-xs font-medium transition-colors ${statusClasses[status]}`}
        >
          ?
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[340px] overflow-hidden rounded-2xl border border-border bg-popover p-0 shadow-xl"
        sideOffset={8}
      >
        <div className="flex min-h-[300px]">
          {/* Kanji display section */}
          <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-primary p-3 text-primary-foreground">
            <span className="text-5xl font-bold leading-none tracking-tight">
              {kanji}
            </span>
            <span className="mt-3 text-[10px] uppercase tracking-[0.2em] opacity-70">
              漢字
            </span>
          </div>

          {/* Info section */}
          <div className="min-w-0 flex-1 space-y-4 p-5">
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
            <InfoRow
              label="Radicals"
              value={cardRadical}
              labelJp="部首"
              className="text-foreground/90"
            />
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border/70 pt-4">
              <InfoRow label="Strokes" value={cardStrokes} labelJp="画数" />
              <InfoRow label="Grade" value={cardGrade} labelJp="学年" />
              <InfoRow label="Frequency" value={cardFrequency} labelJp="頻度" />
              <InfoRow label="JLPT" value={cardJlpt ? `N${cardJlpt}` : null} />
            </div>
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
        {Array.isArray(value) ? value.join(", ") || "—" : value || "—"}
      </p>
    </div>
  );
}

export default KanjiHint;
