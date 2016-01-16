var gulp = require('gulp-param')(require('gulp'), process.argv),
    gulpCopy = require('gulp-copy'),
    gulpLog = require('gulp-log');

// copy tmp to dist
gulp.task('dist', function () {
    return gulp.src('./tmp/**')
        .pipe(gulpCopy('./dist', {prefix: 1}))
        .pipe(gulpLog());
});