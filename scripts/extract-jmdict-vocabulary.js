const fs = require("fs");
const zlib = require("zlib");

const inputPath = process.argv[2] || "src/data/JMdict_e.gz";
const outputPath = process.argv[3] || "src/data/kanji-vocabulary.json";
const xml = zlib.gunzipSync(fs.readFileSync(inputPath)).toString("utf8");
const vocabulary = {};

const text = (value) => value.replace(/&amp;/g, "&").replace(/&lt;/g, "<");

for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
  const entry = match[1];
  const kanji = [
    ...entry.matchAll(/<k_ele>[\s\S]*?<keb>(.*?)<\/keb>[\s\S]*?<\/k_ele>/g),
  ].map(([, value]) => text(value));
  if (!kanji.length) continue;

  const readings = [
    ...entry.matchAll(/<r_ele>[\s\S]*?<reb>(.*?)<\/reb>[\s\S]*?<\/r_ele>/g),
  ].map(([, value]) => text(value));
  const priorities = [
    ...entry.matchAll(/<(?:ke_pri|re_pri)>(.*?)<\/(?:ke_pri|re_pri)>/g),
  ].map(([, value]) => value);
  const english = [...entry.matchAll(/<gloss([^>]*)>(.*?)<\/gloss>/g)]
    .filter(([, attributes]) => {
      const language = attributes.match(/xml:lang="([^"]+)"/)?.[1];
      return !language || language === "eng";
    })
    .map(([, , value]) => text(value));

  if (!readings.length || !english.length) continue;

  const priority = Math.min(
    ...priorities.map((value) => {
      const frequency = value.match(/^nf(\d+)$/);
      if (frequency) return Number(frequency[1]);
      if (/^(ichi|news|spec|gai)1$/.test(value)) return 0;
      return 100;
    }),
    100,
  );

  for (const word of kanji) {
    for (const character of [...word]) {
      if (!/\p{Script=Han}/u.test(character)) continue;
      vocabulary[character] ??= [];
      for (const reading of readings) {
        const item = {
          word,
          reading,
          meaning: english.slice(0, 3).join("; "),
          priority,
        };
        if (
          !vocabulary[character].some(
            (value) => value.word === word && value.reading === reading,
          )
        ) {
          vocabulary[character].push(item);
        }
      }
    }
  }
}

for (const values of Object.values(vocabulary)) {
  values.sort(
    (a, b) => a.priority - b.priority || a.word.length - b.word.length,
  );
  values.splice(8);
  for (const value of values) delete value.priority;
}

fs.writeFileSync(outputPath, `${JSON.stringify(vocabulary, null, 2)}\n`);
console.log(
  `Extracted vocabulary for ${Object.keys(vocabulary).length} kanji.`,
);
