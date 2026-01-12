export const loadKanjiData = async (levels) => {
  // Dynamic import based on selected levels
  const kanjiModules = await Promise.all(
    levels.map((level) => {
      // Use level since it's already a string or number
      const l = parseInt(level, 10);
      switch (l) {
        case 1:
          return import("./kanji-1.json");
        case 2:
          return import("./kanji-2.json");
        case 3:
          return import("./kanji-3.json");
        case 4:
          return import("./kanji-4.json");
        case 5:
          return import("./kanji-5.json");
        default:
          return Promise.resolve({ default: {} });
      }
    }),
  );

  return kanjiModules.reduce((acc, module) => {
    return { ...acc, ...module.default };
  }, {});
};
