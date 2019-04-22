const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const concat = require('gulp-concat');

gulp.task('ant_js', function () {
    gulp.src('src/page/*.js')
        .pipe(babel())
        // .pipe(concat("src/page/*.html"))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

gulp.task('ant_watch', function () {
    var watcher = gulp.watch('src/page/*.js', gulp.series('ant_js'));
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})
gulp.task('default', gulp.parallel('ant_js', 'ant_watch'));