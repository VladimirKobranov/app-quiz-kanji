const fs = require("fs");

const inputPath = process.argv[2] || "src/data/kanjidic2.xml";
const outputPath = process.argv[3] || "src/data/kanjidic-radicals.json";

const xml = fs.readFileSync(inputPath, "utf8");
const radicals = {};

for (const entry of xml.matchAll(/<character>([\s\S]*?)<\/character>/g)) {
  const character = entry[1].match(/<literal>(.*?)<\/literal>/)?.[1];
  const radical = entry[1].match(
    /<rad_value\s+rad_type="classical">(\d+)<\/rad_value>/,
  )?.[1];

  if (!character || !radical) continue;

  const number = Number(radical);
  radicals[character] = {
    number,
    glyph: String.fromCodePoint(0x2f00 + number - 1).normalize("NFKC"),
  };
}

fs.writeFileSync(outputPath, `${JSON.stringify(radicals, null, 2)}\n`);
console.log(`Extracted ${Object.keys(radicals).length} radicals.`);
