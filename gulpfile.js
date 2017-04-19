var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');
    compass = require('gulp-compass');
    connect = require('gulp-connect');
    gulpif = require('gulp-if');
    uglify = require('gulp-uglify');
    minifyHTML = require('gulp-minify-html');

// Create gulp plugins from node install
// npm install --save-dev gulp-**

var jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle
// Create variables for enviroments



env = process.env.NODE_ENV || 'development';

if (env==='development') {
   outputDir = 'builds/development/';
   sassStyle = 'expanded';
} else {
   outputDir = 'builds/production/';
   sassStyle = 'compressed';
}
// Conditions for development and production enviroments

jsSources = ['components/scripts/*.js'];
sassSources = ['components/sass/style.scss'];
htmlSources = ['builds/development/*.html'];
// Paths to files





gulp.task('js', function() {
    gulp.src(jsSources)
     .pipe(concat('script.js'))
     .pipe(browserify())
     .pipe(gulpif (env === 'production', uglify()))
     .pipe(gulp.dest(outputDir + 'js'))
     .pipe(connect.reload())
});
// Concat all javascript files

gulp.task('html', function() {
     gulp.src(htmlSources)
     .pipe(gulpif (env === 'production', minifyHTML()))
     .pipe(gulpif (env === 'production', gulp.dest(outputDir)))
     .pipe(connect.reload())
});
// Reoad changes to HTML & Minify production HTML

gulp.task('compass', function() {
    gulp.src(sassSources)
     .pipe(compass({
     	css: outputDir + 'css',
     	sass: 'components/sass',
     	image: outputDir + 'images',
     	style: sassStyle
     }))
     .on('error', gutil.log)
     .pipe(gulp.dest(outputDir + 'css'))
     .pipe(connect.reload())
});
// Compiles SASS and Compass CSS

gulp.task('connect', function() {
    connect.server({
    root: outputDir,
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