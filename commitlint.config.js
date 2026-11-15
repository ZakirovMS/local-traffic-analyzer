const fs = require("fs");
const path = require("path");

function getAllDirectories(dir, baseDir = "") {
  let dirs = new Set();
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const ignoreList = [
      "node_modules",
      "build",
      "bin",
      "tmp",
      "release",
      ".vscode",
      ".git",
    ];
    for (const item of items) {
      if (item.isDirectory() && !ignoreList.includes(item.name)) {
        const relativePath = path.posix.join(baseDir, item.name);
        dirs.add(relativePath);
        const subDirs = getAllDirectories(
          path.join(dir, item.name),
          relativePath,
        );
        subDirs.forEach((d) => dirs.add(d));
      }
    }
  } catch (e) {
    console.warn(
      `[commitlint] Could not read folder "${dir}". Skip it. Reason ${e.message}`,
    );
  }
  return dirs;
}

const allowedScopes = Array.from(getAllDirectories(process.cwd())).sort();

allowedScopes.push("root");

module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "scope-empty": [2, "never"],
    "subject-case": [0],
    "scope-enum": [2, "always", allowedScopes],
  },
};
