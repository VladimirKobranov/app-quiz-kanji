const fs = require("fs");
const path = require("path");

const KANJI_DATA_PATH = path.join(__dirname, "../src/data/kanji.json");
const OUTPUT_DIR = path.join(__dirname, "../src/data");

const splitKanji = () => {
  console.log("Reading kanji.json...");
  const data = JSON.parse(fs.readFileSync(KANJI_DATA_PATH, "utf8"));

  const levels = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  };

  console.log("Splitting data...");
  Object.keys(data).forEach((kanji) => {
    const kData = data[kanji];
    const level = kData.jlpt_new;
    if (level && levels[level]) {
      levels[level][kanji] = kData;
    }
  });

  console.log("Writing files...");
  Object.keys(levels).forEach((level) => {
    const filePath = path.join(OUTPUT_DIR, `kanji-${level}.json`);
    fs.writeFileSync(filePath, JSON.stringify(levels[level], null, 2));
    console.log(
      `Created kanji-${level}.json with ${Object.keys(levels[level]).length} entries.`,
    );
  });

  console.log("Done!");
};

splitKanji();
