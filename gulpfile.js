var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var connect = require('gulp-connect');

gulp.task('bundle.js', function() {
  return browserify('./src/index.js')
    .transform(babelify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
});

gulp.task('copy', function() {
  return gulp.src(['./src/**/*.html', './src/**/*.css'])
    .pipe(gulp.dest('./build/'))
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
  return gulp.watch('./src/**', ['default']);
});

gulp.task('dev', ['watch', 'connect']);

gulp.task('default', ['bundle.js', 'copy']);