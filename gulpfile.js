var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');
    compass = require('gulp-compass');
    connect = require('gulp-connect');
// Create gulp plugins from node install
// npm install --save-dev gulp-**

var devBuild = ['builds/development/'];
var prodBuild = ['builds/production/'];
var jsSources = ['components/scripts/*.js'];
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
// Paths to files

gulp.task('js', function() {
    gulp.src(jsSources)
     .pipe(concat('script.js'))
     .pipe(browserify())
     .pipe(gulp.dest(devBuild + 'js'))
     .pipe(connect.reload())
});
// Concat all javascript files

gulp.task('html', function() {
     gulp.src(htmlSources)
     .pipe(connect.reload())
});
// Reoad changes to HTML

gulp.task('compass', function() {
    gulp.src(sassSources)
     .pipe(compass({
     	css: devBuild + 'css',
     	sass: 'components/sass',
     	image: devBuild + 'images',
     	style: 'expanded'
     }))
     .on('error', gutil.log)
     .pipe(gulp.dest(devBuild + 'css'))
     .pipe(connect.reload())
});
// Compiles SASS and Compass CSS

gulp.task('connect', function() {
    connect.server({
    root: 'builds/development',
    livereload: true
    });
});
// Setup server for live reload


gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch('components/sass/*.scss', ['compass']);
});
// Watch task, looks for changes and automatically updates. 

gulp.task('default', ['js', 'html', 'compass', 'connect', 'watch']);
// Runs all tasks 