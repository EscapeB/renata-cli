const fs = require("fs");
const path = require("path");
module.exports = (function() {
  const AppRoot = fs.realpathSync(process.cwd());
  const isProduction = process.env.NODE_ENV === "production" ? true : false;
  const isTsProject = fs.existsSync(path.resolve(AppRoot, "./tsconfig.json"))
    ? true
    : false;
  const hasMock = fs.existsSync(path.resolve(AppRoot, "./mock"));
  const hasESlint = fs.existsSync(path.resolve(AppRoot, ".eslintrc.js"));
  const publicUrl = isProduction ? "./" : "/";
  const publicDir = path.resolve(AppRoot, "public");
  const src = path.resolve(
    AppRoot,
    isTsProject ? "./src/index.tsx" : "./src/index.jsx"
  );
  console.log(src);
  return {
    AppRoot,
    env: isProduction ? "production" : "development",
    isProduction,
    isTsProject,
    hasMock,
    hasESlint,
    publicUrl,
    publicDir,
    outputDir: path.resolve(AppRoot, "./dist"),
    src
  };
})();
