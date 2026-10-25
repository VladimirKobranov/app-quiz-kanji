import radicalData from "@/data/kanjidic-radicals.json";
import partsData from "@/data/kanji-parts.json";
import type { KanjiData } from "@/types";

type RawKanjiData = Omit<KanjiData, "radical" | "parts">;

export const loadKanjiData = async (
  levels: Array<string | number>,
): Promise<Record<string, KanjiData>> => {
  // Dynamic import based on selected levels
  const kanjiModules = await Promise.all(
    levels.map((level) => {
      // Use level since it's already a string or number
      const l = parseInt(String(level), 10);
      switch (l) {
        case 1:
          return import("@/data/kanji-1.json");
        case 2:
          return import("@/data/kanji-2.json");
        case 3:
          return import("@/data/kanji-3.json");
        case 4:
          return import("@/data/kanji-4.json");
        case 5:
          return import("@/data/kanji-5.json");
        default:
          return Promise.resolve({ default: {} });
      }
    }),
  );

  return kanjiModules.reduce<Record<string, KanjiData>>((acc, module) => {
    for (const [kanji, data] of Object.entries(module.default)) {
      acc[kanji] = {
        ...(data as RawKanjiData),
        radical: radicalData[kanji] || null,
        parts: partsData[kanji] || [],
      };
    }
    return acc;
  }, {});
};
