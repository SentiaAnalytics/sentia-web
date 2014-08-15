'use strict';
var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  jshint = require('gulp-jshint');

gulp.task('mocha', function() {
  return gulp.src('test/**/*.js')
    .pipe(mocha({
      reporter: 'dot'
    }));
});
gulp.task('jshint', function() {
  return gulp.src('**/*.js')
    .pipe(jshint());
});

gulp.task('watch', function() {
  return gulp.watch([
      'server.js',
      'routes/**/*.js',
      'services/**/*.js',
      'test/**/*.js'
    ], ['mocha']);
});
