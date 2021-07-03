var gulp = require('gulp'); 'use strict';
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var minify = require('gulp-minify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

//SASS
gulp.task('sass', function () {
    return gulp.src('./src/scss/imports.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/dist/css'))
        .pipe(notify('SASS compiled!'))
    });
    
    //UGLIFY CSS
    gulp.task('css', function () {
        gulp.src('./src/dist/css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(plumber('ERROR!'))
        .pipe(notify('CSS compiled!'))
        .pipe(gulp.dest('./src/dist/css'));
    });
    
    //MINIFY JS
    gulp.task('js', function () {
        gulp.src(['./src/JS/common.js'])
        .pipe(minify())
        .pipe(notify('JS compiled!'))
        .pipe(plumber())
        .pipe(gulp.dest('./src/dist/js'))
    });
    
    //NOTIFY
    
    //RUN
    gulp.task('run', ['sass', 'css', 'js']);
    
    //WATCH
    gulp.task('watch', function () {
        gulp.watch('./src/scss/imports.scss', ['sass']);
        gulp.watch('./src/dist/css/*.css', ['css']);
        gulp.watch('./src/JS/common.js', ['js']);
    });
    