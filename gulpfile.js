const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");

gulp.task('default', function () {
    gulp.src('*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});