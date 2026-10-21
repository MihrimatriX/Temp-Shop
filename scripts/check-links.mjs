// Fails if any exported page links to a path that is not in out/.
// Usage: node scripts/check-links.mjs [basePath]
import fs from "node:fs";
import path from "node:path";

const out = "out";
const base = process.argv[2] ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const files = fs
  .readdirSync(out, { recursive: true })
  .filter((f) => f.endsWith(".html"))
  .map((f) => path.join(out, f));

const problems = new Map();
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const [, url] of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)/g)) {
    if (url.startsWith("//")) continue;
    let reason = null;
    if (base && !url.startsWith(base + "/")) {
      reason = "missing basePath";
    } else {
      const target = path.join(out, decodeURIComponent(url.slice(base.length)));
      const exists =
        fs.existsSync(target) &&
        (fs.statSync(target).isFile() ||
          fs.existsSync(path.join(target, "index.html")));
      if (!exists) reason = "not found";
    }
    if (reason && !problems.has(url)) problems.set(url, `${reason} (${file})`);
  }
}

console.log(`${files.length} pages checked, ${problems.size} bad links`);
for (const [url, info] of problems) console.log(`  ${url}: ${info}`);
process.exit(problems.size ? 1 : 0);
