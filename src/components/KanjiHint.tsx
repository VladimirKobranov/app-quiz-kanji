import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStore } from "@/store/useStore";
import type { KanjiData } from "@/types";
import radicalData from "@/data/kanjidic-radicals.json";
import partsData from "@/data/kanji-parts.json";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

interface KanjiHintProps {
  kanji: string;
  cardMeaning?: string[];
  cardOn?: string[];
  cardKun?: string[];
  cardRadical?: string | null;
  cardParts?: string[];
  cardStrokes?: number;
  cardGrade?: number;
  cardFrequency?: number;
  cardJlpt?: number;
  status?: "idle" | "correct" | "incorrect";
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: "button" | "card" | "none";
}

function KanjiHint({
  kanji,
  cardMeaning,
  cardOn,
  cardKun,
  cardRadical,
  cardParts,
  cardStrokes,
  cardGrade,
  cardFrequency,
  cardJlpt,
  status = "idle",
  open,
  onOpenChange,
  trigger = "button",
}: KanjiHintProps) {
  const [cardVocabulary, setCardVocabulary] = useState([]);
  const [activeKanji, setActiveKanji] = useState(kanji);
  const [mobileTab, setMobileTab] = useState("Overview");
  const [showAllWords, setShowAllWords] = useState(false);
  const [compactHero, setCompactHero] = useState(false);
  const touchStart = useRef(null);
  const fullHeroRef = useRef(null);
  const isMobile = useIsMobile();
  const kanjiData = useStore((state) => state.kanjiData[activeKanji]) as
    KanjiData | undefined;
  const activeKanjiData =
    kanjiData ??
    ({
      strokes: 0,
      grade: 0,
      jlpt_new: 0,
      meanings: [],
      readings_on: [],
      readings_kun: [],
    } satisfies KanjiData);
  const currentDeck = useStore((state) => state.currentDeck);
  const currentPage = useStore((state) => state.currentPage);
  const itemsPerPage = useStore((state) => state.itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageKanji = currentDeck.slice(pageStart, pageStart + itemsPerPage);
  const activeIndex = pageKanji.indexOf(activeKanji);
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex >= 0 && activeIndex < pageKanji.length - 1;
  const displayMeaning =
    activeKanjiData.meanings ?? (activeKanji === kanji ? cardMeaning : []);
  const displayOn =
    activeKanjiData.readings_on ?? (activeKanji === kanji ? cardOn : []);
  const displayKun =
    activeKanjiData.readings_kun ?? (activeKanji === kanji ? cardKun : []);
  const displayRadical =
    activeKanjiData.radical?.glyph ||
    radicalData[activeKanji]?.glyph ||
    (activeKanji === kanji ? cardRadical : null);
  const displayParts =
    activeKanjiData.parts ||
    partsData[activeKanji] ||
    (activeKanji === kanji ? cardParts : []);
  const displayStrokes =
    activeKanjiData.strokes ?? (activeKanji === kanji ? cardStrokes : null);
  const displayGrade =
    activeKanjiData.grade ?? (activeKanji === kanji ? cardGrade : null);
  const displayFrequency =
    activeKanjiData.freq ?? (activeKanji === kanji ? cardFrequency : null);
  const displayJlpt =
    activeKanjiData.jlpt_new ?? (activeKanji === kanji ? cardJlpt : null);

  const navigate = (direction) => {
    const nextIndex = activeIndex + direction;
    if (pageKanji[nextIndex]) setActiveKanji(pageKanji[nextIndex]);
  };

  useEffect(() => {
    setShowAllWords(false);
    let active = true;
    import("@/data/kanji-vocabulary.json").then(({ default: vocabulary }) => {
      if (active) setCardVocabulary(vocabulary[activeKanji] || []);
    });

    return () => {
      active = false;
    };
  }, [activeKanji]);

  useEffect(() => {
    if (open) {
      setActiveKanji(kanji);
      setMobileTab("Overview");
      setCompactHero(false);
    }
  }, [open, kanji]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.3)
      navigate(dx < 0 ? 1 : -1);
    else if (dy > 100 && Math.abs(dy) > Math.abs(dx) * 1.3) onOpenChange(false);
  };

  const statusClasses = {
    idle: "bg-secondary text-muted-foreground",
    correct: "bg-primary text-primary-foreground",
    incorrect: "bg-destructive text-white",
  };

  const _details = (
    <div className="flex min-h-0">
      <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-primary p-3 text-primary-foreground">
        <span className="text-5xl font-bold leading-none tracking-tight">
          {kanji}
        </span>
        <span className="mt-3 text-[10px] uppercase tracking-[0.2em] opacity-70">
          漢字
        </span>
      </div>
      <div className="min-w-0 flex-1 space-y-4 overflow-y-auto p-5">
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
        {cardParts?.length > 0 && (
          <InfoRow
            label="Parts"
            value={cardParts.join(" · ")}
            labelJp="構成"
            className="text-foreground/90"
          />
        )}
        {cardVocabulary?.length > 0 && (
          <div className="border-t border-border/70 pt-4">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Vocabulary
              </span>
              <span className="text-[9px] text-muted-foreground/60">単語</span>
            </div>
            <div className="space-y-2">
              {cardVocabulary.slice(0, 4).map((item) => (
                <div key={`${item.word}-${item.reading}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-semibold text-popover-foreground">
                      {item.word}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.reading}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border/70 pt-4">
          <InfoRow label="Strokes" value={cardStrokes} labelJp="画数" />
          <InfoRow label="Grade" value={cardGrade} labelJp="学年" />
          <InfoRow label="Frequency" value={cardFrequency} labelJp="頻度" />
          <InfoRow label="JLPT" value={cardJlpt ? `N${cardJlpt}` : null} />
        </div>
      </div>
    </div>
  );

  const meanings = Array.isArray(displayMeaning)
    ? displayMeaning
    : String(displayMeaning || "")
        .split(/[,;]/)
        .map((meaning) => meaning.trim())
        .filter(Boolean);

  const mobileDetails = (
    <div className="relative flex h-full min-h-0 flex-col bg-background text-foreground">
      <div
        onScroll={(event) => {
          const scrollTop = event.currentTarget.getBoundingClientRect().top;
          setCompactHero(
            fullHeroRef.current?.getBoundingClientRect().bottom <= scrollTop,
          );
        }}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        <header
          ref={fullHeroRef}
          className="bg-foreground px-4 pt-[calc(env(safe-area-inset-top)+12px)] pb-5 text-background"
        >
          <div className="flex h-11 items-center justify-between">
            <span className="size-11" aria-hidden="true" />
            <span className="text-xs tracking-[0.2em] text-background/70">
              漢字
            </span>
            <button
              type="button"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className="flex size-11 items-center justify-center rounded-full border border-background/30 text-background"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="text-center text-[120px] font-bold leading-[1.1]">
            {activeKanji}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {meanings.map((meaning) => (
              <span
                key={meaning}
                className="rounded-full border border-background/30 px-3.5 py-1.5 text-sm"
              >
                {meaning}
              </span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2">
            <MobileStat
              label="JLPT"
              value={displayJlpt ? `N${displayJlpt}` : "—"}
              featured
            />
            <MobileStat label="Strokes" value={displayStrokes} />
            <MobileStat label="Grade" value={displayGrade} />
            <MobileStat label="Freq" value={displayFrequency} />
          </div>
        </header>

        <nav
          className={cn(
            "sticky z-20 bg-background px-4 pt-4",
            compactHero
              ? "top-[calc(116px+env(safe-area-inset-top))]"
              : "top-0",
          )}
        >
          <div className="flex rounded-xl bg-secondary p-1">
            {["Overview", "Words", "Parts"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMobileTab(tab)}
                className={cn(
                  "h-10 flex-1 rounded-lg text-sm",
                  mobileTab === tab
                    ? "bg-background font-bold text-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        <div className="px-5 pt-4 pb-28">
          {mobileTab === "Overview" && (
            <section className="grid grid-cols-2 gap-3">
              <MobileReadings
                label="Onyomi"
                labelJp="音読み"
                value={displayOn}
              />
              <MobileReadings
                label="Kunyomi"
                labelJp="訓読み"
                value={displayKun}
                kunyomi
              />
            </section>
          )}

          {mobileTab === "Words" && cardVocabulary?.length > 0 && (
            <section className="mt-2">
              <MobileSectionTitle label="Vocabulary" labelJp="単語" />
              <div>
                {cardVocabulary
                  .slice(0, showAllWords ? undefined : 4)
                  .map((item) => (
                    <div
                      key={`${item.word}-${item.reading}`}
                      className="grid grid-cols-[88px_1fr] items-center gap-3 border-b border-border/70 py-3 last:border-0"
                    >
                      <div>
                        <div className="text-[11px] text-muted-foreground">
                          {item.reading}
                        </div>
                        <div className="text-xl font-bold leading-tight">
                          {item.word}
                        </div>
                      </div>
                      <p className="text-sm leading-snug text-foreground/80">
                        {item.meaning}
                      </p>
                    </div>
                  ))}
                {cardVocabulary.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setShowAllWords(!showAllWords)}
                    className="mt-3 text-sm font-semibold underline"
                  >
                    {showAllWords ? "Show less" : "Show all"}
                  </button>
                )}
              </div>
            </section>
          )}

          {mobileTab !== "Words" && (
            <section className="mt-6 grid grid-cols-2 gap-4 border-t border-border/70 pt-5">
              <div>
                <MobileSectionTitle label="Radical" labelJp="部首" />
                {displayRadical ? (
                  <MobileGlyph>{displayRadical}</MobileGlyph>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>
              <div>
                <MobileSectionTitle label="Parts" labelJp="構成" />
                <div className="flex flex-wrap gap-2">
                  {displayParts?.length ? (
                    displayParts.map((part) => (
                      <MobileGlyph key={part}>{part}</MobileGlyph>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      <header
        className={cn(
          "absolute inset-x-0 top-0 z-30 bg-foreground px-4 pt-[calc(env(safe-area-inset-top)+12px)] pb-3 text-background transition-[opacity,transform] duration-200",
          compactHero
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!compactHero}
      >
        <div className="flex h-11 items-center justify-between">
          <span className="size-11" aria-hidden="true" />
          <span className="text-xs tracking-[0.2em] text-background/70">
            漢字
          </span>
          <button
            type="button"
            aria-label="Close"
            tabIndex={compactHero ? 0 : -1}
            onClick={() => onOpenChange(false)}
            className="flex size-11 items-center justify-center rounded-full border border-background/30 text-background"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="text-4xl font-bold">{activeKanji}</span>
          <span className="max-w-[70%] truncate text-sm text-background/80">
            {meanings[0] || "—"}
          </span>
        </div>
      </header>
      <footer className="absolute inset-x-0 bottom-0 flex gap-3 border-t border-border bg-background px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={() => navigate(-1)}
          className="h-12 flex-1 rounded-[14px] border border-border bg-background text-sm font-bold disabled:opacity-40"
        >
          ‹ Prev
        </button>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => navigate(1)}
          className="h-12 flex-1 rounded-[14px] bg-foreground text-sm font-bold text-background disabled:opacity-40"
        >
          Next ›
        </button>
      </footer>
    </div>
  );

  const buttonElement =
    trigger === "button" ? (
      <Button
        tabIndex={-1}
        variant="ghost"
        size="icon"
        className={cn(
          "size-5 rounded-full p-0 text-xs font-medium transition-colors",
          statusClasses[status],
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/80",
        )}
      >
        ?
      </Button>
    ) : null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        {buttonElement &&
          React.cloneElement(buttonElement, {
            onClick: () => onOpenChange(true),
          })}
        <SheetContent
          side="bottom"
          showCloseButton={false}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" && canGoPrevious) {
              event.preventDefault();
              navigate(-1);
            }
            if (event.key === "ArrowRight" && canGoNext) {
              event.preventDefault();
              navigate(1);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="!fixed !inset-0 !h-[100dvh] !max-h-none !w-auto !max-w-none gap-0 overflow-hidden rounded-none border-0 p-0"
        >
          <SheetTitle className="sr-only">
            Информация о кандзи {activeKanji}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Чтения, значение и примеры использования кандзи.
          </SheetDescription>
          {mobileDetails}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {buttonElement &&
        React.cloneElement(buttonElement, {
          onClick: () => onOpenChange(true),
        })}
      <SheetContent
        showCloseButton={false}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" && canGoPrevious) {
            event.preventDefault();
            navigate(-1);
          }
          if (event.key === "ArrowRight" && canGoNext) {
            event.preventDefault();
            navigate(1);
          }
        }}
        className="!fixed !left-1/2 !top-1/2 !right-auto !bottom-auto !h-[min(680px,90vh)] !max-h-[90vh] !w-[min(960px,90vw)] !max-w-none !-translate-x-1/2 !-translate-y-1/2 !animate-none overflow-visible rounded-3xl border-0 bg-transparent p-0 shadow-none"
      >
        <SheetTitle className="sr-only">
          Информация о кандзи {activeKanji}
        </SheetTitle>
        <SheetDescription className="sr-only">
          Чтения, значение и примеры использования кандзи.
        </SheetDescription>
        <button
          type="button"
          aria-label="Previous kanji"
          disabled={!canGoPrevious}
          onClick={() => navigate(-1)}
          className="absolute left-[-72px] top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-2xl text-foreground shadow disabled:opacity-40"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next kanji"
          disabled={!canGoNext}
          onClick={() => navigate(1)}
          className="absolute right-[-72px] top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-2xl text-foreground shadow disabled:opacity-40"
        >
          ›
        </button>
        <div className="grid h-full min-h-0 grid-cols-[320px_1fr] overflow-hidden rounded-3xl bg-background text-foreground shadow-2xl">
          <aside className="flex min-h-0 flex-col bg-foreground px-7 py-8 text-background">
            <span className="text-xs tracking-[0.2em] text-background/70">
              漢字
            </span>
            <div className="mt-6 text-center text-[160px] font-bold leading-[1.1]">
              {activeKanji}
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {meanings.map((meaning) => (
                <span
                  key={meaning}
                  className="rounded-full border border-background/30 px-3 py-1 text-sm"
                >
                  {meaning}
                </span>
              ))}
            </div>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
              <DesktopStat
                label="JLPT"
                value={displayJlpt ? `N${displayJlpt}` : "—"}
                featured
              />
              <DesktopStat label="Strokes" value={displayStrokes} />
              <DesktopStat label="Grade" value={displayGrade} />
              <DesktopStat label="Freq" value={displayFrequency} />
            </div>
          </aside>
          <main className="relative flex min-h-0 flex-col gap-5 overflow-hidden px-8 py-7">
            <button
              type="button"
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className="absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground"
            >
              <X className="size-4" />
            </button>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <DesktopReading
                label="Onyomi"
                labelJp="音読み"
                value={displayOn}
              />
              <DesktopReading
                label="Kunyomi"
                labelJp="訓読み"
                value={displayKun}
                kunyomi
              />
            </div>
            <section className="flex min-h-0 flex-1 flex-col">
              <MobileSectionTitle label="Vocabulary" labelJp="単語" />
              <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2.5 overflow-y-auto overscroll-contain pr-1">
                {cardVocabulary.map((item) => (
                  <div
                    key={`${item.word}-${item.reading}`}
                    className="rounded-[14px] border border-border px-3.5 py-3"
                  >
                    <div className="text-[11px] text-muted-foreground">
                      {item.reading}
                    </div>
                    <div className="text-2xl font-bold">{item.word}</div>
                    <div className="mt-0.5 text-[13px] leading-snug text-foreground/80">
                      {item.meaning}
                    </div>
                  </div>
                ))}
                {!cardVocabulary.length && (
                  <p className="col-span-2 text-sm text-muted-foreground">—</p>
                )}
              </div>
            </section>
            <section className="flex shrink-0 gap-10 border-t border-border/70 pt-4">
              <div>
                <MobileSectionTitle label="Radical" labelJp="部首" />
                <div className="flex gap-2">
                  {displayRadical && (
                    <MobileGlyph>{displayRadical}</MobileGlyph>
                  )}
                </div>
              </div>
              <div>
                <MobileSectionTitle label="Parts" labelJp="構成" />
                <div className="flex gap-2">
                  {displayParts?.map((part) => (
                    <MobileGlyph key={part}>{part}</MobileGlyph>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function InfoRow({
  label,
  labelJp,
  value,
  className,
}: {
  label: string;
  labelJp?: string;
  value: React.ReactNode;
  className?: string;
}) {
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

function MobileStat({ label, value, featured = false }) {
  return (
    <div
      className={cn(
        "rounded-xl px-2 py-2 text-center",
        featured
          ? "bg-background text-foreground"
          : "bg-background/10 text-background",
      )}
    >
      <div
        className={cn(
          "text-[9px] uppercase tracking-wide",
          featured ? "text-muted-foreground" : "text-background/70",
        )}
      >
        {label}
      </div>
      <div className="text-base font-bold">{value ?? "—"}</div>
    </div>
  );
}

function DesktopStat({ label, value, featured = false }) {
  return (
    <div
      className={cn(
        "rounded-xl px-2 py-2.5 text-center",
        featured
          ? "bg-background text-foreground"
          : "bg-background/10 text-background",
      )}
    >
      <div
        className={cn(
          "text-[10px] uppercase tracking-wide",
          featured ? "text-muted-foreground" : "text-background/70",
        )}
      >
        {label}
      </div>
      <div className="text-xl font-bold">{value ?? "—"}</div>
    </div>
  );
}

function DesktopReading({ label, labelJp, value, kunyomi = false }) {
  const readings = Array.isArray(value)
    ? value
    : String(value || "")
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter(Boolean);
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <MobileSectionTitle label={label} labelJp={labelJp} />
      <div className="flex flex-wrap gap-1.5">
        {readings.length ? (
          readings.map((reading) => (
            <ReadingChip key={reading} reading={reading} kunyomi={kunyomi} />
          ))
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </div>
    </div>
  );
}

function ReadingChip({ reading, kunyomi }) {
  if (!kunyomi)
    return (
      <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-lg font-bold">
        {reading}
      </span>
    );
  const [stem, ...suffix] = reading.replace(/^-/, "").split(".");
  const prefix = reading.startsWith("-");
  return (
    <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-lg">
      <span className="text-muted-foreground">{prefix ? "-" : ""}</span>
      <b>{stem}</b>
      <span className="text-muted-foreground">
        {suffix.length ? `.${suffix.join(".")}` : ""}
      </span>
    </span>
  );
}

function MobileSectionTitle({ label, labelJp }) {
  return (
    <div className="mb-3 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
      {label}{" "}
      {labelJp && (
        <span className="ml-1 normal-case tracking-normal">{labelJp}</span>
      )}
    </div>
  );
}

function MobileReadings({ label, labelJp, value, kunyomi = false }) {
  const readings = Array.isArray(value)
    ? value
    : String(value || "")
        .split(/[,;]/)
        .map((reading) => reading.trim())
        .filter(Boolean);

  return (
    <div>
      <MobileSectionTitle label={label} labelJp={labelJp} />
      <div className="flex min-h-20 flex-wrap content-start gap-1.5 rounded-2xl border border-border bg-card p-3.5">
        {readings.length ? (
          readings.map((reading) => (
            <ReadingChip key={reading} reading={reading} kunyomi={kunyomi} />
          ))
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </div>
    </div>
  );
}

function MobileGlyph({ children }) {
  return (
    <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-2xl font-medium">
      {children}
    </span>
  );
}

export default KanjiHint;
