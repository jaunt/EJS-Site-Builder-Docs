var md = require("markdown-it")().use(require("markdown-it-highlightjs"));
const path = require("path");
const fs = require("fs");
let docs;

if (!inputs.triggeredBy) {
  // get absolute paths to data files
  docs = getDataFileNames("md/**/*.md");
} else {
  docs = [inputs.triggeredBy];
}

const mapped = docs.map((filepath) => {
  const raw = fs.readFileSync(filepath, "utf8");
  const content = frontMatterParse(raw);
  const html = md.render(content.body);
  const title = content.attributes.title;
  // Use our data paths to specify output paths.
  // Data dir is the absolute path to our data dir
  // We also truncate the '.md' of path names.
  const relPath = filepath.split(dataDir + "/md/")[1].slice(0, -3);
  return {
    path: relPath,
    data: {
      title: title,
      html: html,
    },
  };
});

resolve({
  generate: mapped,
  watchGlobs: ["md/**/*.md"],
});
