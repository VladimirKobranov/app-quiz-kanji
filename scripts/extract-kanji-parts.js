const fs = require("fs");
const zlib = require("zlib");

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "src/data/kanji-parts.json";

if (!inputPath) {
  console.error(
    "Usage: node extract-kanji-parts.js <input-file> <output.json>",
  );
  process.exit(1);
}

const compressed = inputPath.endsWith(".gz");
const source = fs.readFileSync(inputPath);
const text = (compressed ? zlib.gunzipSync(source) : source).toString("utf8");
const parts = {};

for (const line of text.split(/\r?\n/)) {
  const match = line.match(/^(.)(?:\s|:)+(.+)$/u);
  if (!match || match[1] === "#") continue;

  const [kanji, componentText] = match[0].includes(" : ")
    ? match[0].split(" : ")
    : match[0].split(/\s+/, 2);
  const components = componentText?.split(/\s+/u) || [];
  if (kanji && components.length > 0) parts[kanji] = components;
}

fs.writeFileSync(outputPath, `${JSON.stringify(parts, null, 2)}\n`);
console.log(`Extracted parts for ${Object.keys(parts).length} kanji.`);
