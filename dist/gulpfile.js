"use strict";var gulp=require("gulp"),uglify=require("gulp-uglify"),babel=require("gulp-babel");gulp.task("default",function(){gulp.src("*.js").pipe(babel()).pipe(uglify()).pipe(gulp.dest("dist"))});