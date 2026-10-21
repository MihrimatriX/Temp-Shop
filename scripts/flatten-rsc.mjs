// Next 16 static export writes segment prefetch files as
//   <route>/__next.products/$d$id/__PAGE__.txt
// but the client requests
//   <route>/__next.products.$d$id.__PAGE__.txt
// so every prefetch 404s on a plain static host. Copy each file to the
// flat name the client expects.
// ponytail: workaround for a Next.js export bug; delete once `next build`
// emits the flat names itself (check out/orders/ after upgrading).
import fs from "node:fs";
import path from "node:path";

let copied = 0;
for (const rel of fs.readdirSync("out", { recursive: true })) {
  const parts = rel.split(path.sep);
  const i = parts.findIndex((p) => p.startsWith("__next."));
  if (i === -1 || i === parts.length - 1) continue;
  const src = path.join("out", rel);
  if (!fs.statSync(src).isFile()) continue;
  const flat = path.join("out", ...parts.slice(0, i), parts.slice(i).join("."));
  if (!fs.existsSync(flat)) {
    fs.copyFileSync(src, flat);
    copied++;
  }
}
console.log(`flatten-rsc: ${copied} prefetch files copied`);
