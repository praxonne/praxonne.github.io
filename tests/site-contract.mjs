import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const pages = ["index.html", "architecture/index.html", "security/index.html", "developers/index.html", "404.html"];

for (const page of pages) {
  const path = join(root, "dist", page);
  const info = await stat(path);
  if (info.size < 1_000) throw new Error(`${page} is unexpectedly small`);
  const html = await readFile(path, "utf8");
  if (!html.includes("Content-Security-Policy")) throw new Error(`${page} has no CSP`);
  if (!html.includes('class="site-header"')) throw new Error(`${page} has no site header`);
  if (/<script(?![^>]+type="application\/ld\+json")/i.test(html)) throw new Error(`${page} contains client-side script`);
  if (/jekyll|hugo/i.test(html)) throw new Error(`${page} contains a forbidden generator`);
}

const home = await readFile(join(root, "dist", "index.html"), "utf8");
for (const claim of ["forward and reverse", "child processes", "200–302", "draft pull request", "Gemini 3.6 Pro", "ChatGPT SOL 5.6", "Claude Fable"]) {
  if (!home.includes(claim)) throw new Error(`home page is missing claim: ${claim}`);
}

const security = await readFile(join(root, "dist", "security", "index.html"), "utf8");
for (const invariant of ["never automatic", "default-deny egress", "GitHub App token", "human reviewer"]) {
  if (!security.includes(invariant)) throw new Error(`security page is missing invariant: ${invariant}`);
}

const sitemap = await readFile(join(root, "dist", "sitemap.xml"), "utf8");
for (const path of ["/architecture/", "/security/", "/developers/"]) {
  if (!sitemap.includes(path)) throw new Error(`sitemap is missing ${path}`);
}

console.log(`site contract passed for ${pages.length} pages`);
