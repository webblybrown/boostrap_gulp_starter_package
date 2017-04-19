var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');
    compass = require('gulp-compass');

var jsSources = ['components/scripts/*.js'];
var sassSources = ['components/sass/style.scss'];

gulp.task('js', function() {
    gulp.src(jsSources)
     .pipe(concat('script.js'))
     .pipe(browserify())
     .pipe(gulp.dest('builds/development/js'))
});

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

gulp.task('default', ['js','compass']);