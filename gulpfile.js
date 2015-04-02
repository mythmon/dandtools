/* globals require:false */
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var connect = require('gulp-connect');

gulp.task('bundle.js', function() {
  return browserify('./src/index.js', {
      jQuery: 'jquery-browserify',
      bootstrap: 'bootstrap',
    })
    .transform(babelify)
    .bundle()
    .on('error', function(err) { gutil.log('Browserify error', err.loc, err.filename); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/'))
});

gulp.task('copy', function() {
  return gulp.src(['./src/**/*.html', './src/**/*.css'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('reload', function() {
  return gulp.src('./src/**/*')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 8080,
    root: 'build',
    livereload: true,
  });
});

gulp.task('watch', ['default'], function() {
  return gulp.watch('./src/**/*', ['default', 'reload']);
});

gulp.task('dev', ['watch', 'connect']);

gulp.task('default', ['copy', 'bundle.js']);
