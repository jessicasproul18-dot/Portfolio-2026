/**
 * After `next build` with `output: "export"`, Next writes the site to `out/`.
 * This script clears `public_html/`, copies `out/` into it, and then overlays
 * `server/` files into `public_html/` for deployment.
 */

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "out");
const serverDir = path.join(projectRoot, "server");
const publicHtmlDir = path.join(projectRoot, "public_html");

if (!fs.existsSync(outDir)) {
  console.error("build-site: missing out/ - run next build first");
  process.exit(1);
}

if (!fs.existsSync(serverDir)) {
  console.error("build-site: missing server/ directory");
  process.exit(1);
}

const copyDirectoryContents = (sourceDir, destinationDir) => {
  const entries = fs.readdirSync(sourceDir);

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry);
    const destinationPath = path.join(destinationDir, entry);

    fs.cpSync(sourcePath, destinationPath, { recursive: true, force: true });
  }
};

fs.rmSync(publicHtmlDir, { recursive: true, force: true });
fs.mkdirSync(publicHtmlDir, { recursive: true });

copyDirectoryContents(outDir, publicHtmlDir);
copyDirectoryContents(serverDir, publicHtmlDir);
fs.rmSync(outDir, { recursive: true, force: true });

console.log(
  "build-site: cleared public_html/, copied out/, copied server/, removed out/"
);
