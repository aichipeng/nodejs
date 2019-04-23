const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifyHtml = require('gulp-html-minify');
const babel = require("gulp-babel");
const concat = require('gulp-concat');

gulp.task('ant_js', function () {
    gulp.src('src/page/*.js')
        .pipe(babel()) //es6编译
        // .pipe(concat("src/page/*.html")) //合并文件
        .pipe(uglify()) //js压缩
        .pipe(gulp.dest('dist'))
});
gulp.task('ant_html', function () {
    gulp.src('src/page/*.html')
        // .pipe(babel()) //es6编译
        // .pipe(concat("src/page/*.html")) //合并文件
        .pipe(uglifyHtml()) //js压缩
        .pipe(gulp.dest('dist'))
});

gulp.task('ant_watch_js', function () {
    var watcher = gulp.watch('src/page/*.js', gulp.series('ant_js'));
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})

gulp.task('default', gulp.parallel('ant_js', 'ant_html', 'ant_watch_js'));