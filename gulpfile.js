var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');
    compass = require('gulp-compass');
// Create plugins from install
// npm install --save-dev gulp-**

var jsSources = ['components/scripts/*.js'];
var sassSources = ['components/sass/style.scss'];
// Paths to source files

gulp.task('js', function() {
    gulp.src(jsSources)
     .pipe(concat('script.js'))
     .pipe(browserify())
     .pipe(gulp.dest('builds/development/js'))
});
// Concat all javascript files

gulp.task('compass', function() {
    gulp.src(sassSources)
     .pipe(compass({
     	sass: 'components/sass',
     	image:'builds/development/images',
     	style: 'expanded'
     }))
     .on('error', gutil.log)
     .pipe(gulp.dest('builds/development/css'))
});
// Compiles SASS and Compass CSS

gulp.task('default', ['js','compass']);
// Runs all tasks 

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['compass']);
});