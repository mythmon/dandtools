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
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy', function() {
  return gulp.src(['./src/**/*.html', './src/**/*.css'])
    .pipe(gulp.dest('./build/'));
});

gulp.task('connect', function() {
  connect.server({
    port: 8080,
    root: 'build',
  });
});

gulp.task('lib', ['lib/jquery', 'lib/bootstrap']);

gulp.task('lib/jquery', function() {
  return gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('build/lib/jquery/'));
});

gulp.task('lib/bootstrap', function() {
  return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/bootstrap/dist/css/bootstrap.css.map',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/bootstrap/dist/fonts/*',
    ], {
      base: 'node_modules/bootstrap/dist',
    })
    .pipe(gulp.dest('build/lib/bootstrap/'));
});

gulp.task('watch', ['default'], function() {
  return gulp.watch('./src/**', ['default']);
});

gulp.task('dev', ['watch', 'connect']);

gulp.task('default', ['lib', 'copy', 'bundle.js']);
