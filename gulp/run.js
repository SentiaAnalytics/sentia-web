'use strict';
//modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var reload = require('gulp-livereload');
var rename = require('gulp-rename');
var mocha = require('gulp-spawn-mocha');
var run = require('gulp-run');
// require('babel/register');
//constants
gulp.task('static'  , function () {
  reload();
});

gulp.task('run', ['build'], function (done) {
  done();
  run('node node_modules/.bin/babel-node main.js').exec()
    .pipe(rename('server.log'))
    .pipe(gulp.dest('logs'));
});

gulp.task('watch', function () {
  gulp.watch(['services/**/*.js', 'api/**/*.js'], ['spec']);
  gulp.watch(['app/js/**/*'], ['spec']);
});

gulp.task('live', function () {
  reload.listen();
  gulp.watch(['app/js/**/*'], ['browserify']);
  gulp.watch('app/styles/**/*.less', ['less']);
  gulp.watch(['app/index.html', 'app/img/**/*', 'app/templates/**/*'], ['static']);
});
