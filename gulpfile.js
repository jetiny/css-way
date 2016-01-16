var gulp = require('gulp-param')(require('gulp'), process.argv),
    path = require('path'),
    gulpCopy = require('gulp-copy'),
    gulpLog = require('gulp-log'),
    replace = require('gulp-replace'),
    savefile = require('gulp-savefile'),
    sass = require('gulp-sass'),
    fs = require('fs');

function module_paths(dir, subdir) {
    var arr = [], cur;
    do {
        cur = path.resolve(dir);
        arr.push(path.resolve(cur, subdir));
        dir = path.dirname(cur);
    } while (cur != dir);
    return arr;
}

function node_modules(dir) {
    return module_paths(dir, 'node_modules');
}

function bower_components(dir) {
    return module_paths(dir, 'bower_components');
}

function sass_paths(dir, libs) {
    var dist = [];
    var dirs = node_modules(dir).concat(bower_components(dir));
    libs.forEach(function(it){
        for(var i=0, l= dirs.length; i<l; ++i) {
            dir = path.resolve(dirs[i] , it);
            if (fs.existsSync(dir)) {
                dist.push(dir);
                break;
            }
        }
    });
    return dist;
}

//编译sass到当前css目录
var distDir = './dist';

gulp.task('sass', function () {
    var paths = [
            path.resolve(__dirname, '../sass'),
        ].concat(sass_paths(__dirname, [
            'bourbon/app/assets/stylesheets',
            'neat/app/assets/stylesheets',
            'normalize-scss/sass',
            'support-for/sass',
        ]));
    return gulp.src(['./sass/**/*.scss'])
        .pipe(sass({
            includePaths: paths
        }).on('error', sass.logError))
        .pipe(gulpLog())
        .pipe(gulp.dest(distDir+'/css'));
});

//监听sass
gulp.task('sass-watch', function () {
    gulp.watch([
        './sass/**/*.scss',
    ], ['sass']);
});

//复制字体
gulp.task('assets', function () {
    return gulp.src('./fonts/*.*')
        .pipe(gulpCopy(distDir))
        .pipe(gulpLog())
        ;
});

//复制例子
gulp.task('samples', function () {
    return gulp.src('./samples/*.*')
        .pipe(gulpCopy(distDir))
        .pipe(replace(/\.\.\/dist/g, '..'))
        .pipe(savefile())
        .pipe(gulpLog())
        ;
});

// gh-pages
gulp.task('pub', ['assets', 'samples', 'sass']);