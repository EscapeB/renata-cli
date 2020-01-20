const gulp = require("gulp");
const filePattern = ["./packages/**/*", "./packages/**/.*", "!./**/*.ts"];
function defaultTask(cb) {
  // copy other template files to output lib
  return gulp.src(filePattern).pipe(gulp.dest("lib/packages"));
}
// dev task
gulp.task("dev", () => {
  gulp.watch(filePattern, () => {
    return gulp.src(filePattern).pipe(gulp.dest("lib/packages"));
  });
});
exports.default = defaultTask;
