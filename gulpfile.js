'use strict';
//modules
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var reload = require('gulp-livereload');
var mocha = require('gulp-spawn-mocha');
var run = require('gulp-run');
// require('babel/register');
//constants
var PUBLICDIR = 'app/';
require('./gulp/tests');

// BUILD
gulp.task('browserify', function () {
  gulp.src('app/js/main.js', { read: false })
    .pipe(browserify({
      transform: [babelify],
      extensions: ['.jsx'],
      debug: true,
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./app'))
    .pipe(reload());
});

gulp.task('less', function () {
    return gulp.src(PUBLICDIR + 'styles/style.less')
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PUBLICDIR))
      .pipe(reload());
});

gulp.task('static'  , function () {
  reload();
});

gulp.task('build', ['less', 'browserify', 'static']);

gulp.task('run', ['build'], function (done) {
  done();
  run('node node_modules/.bin/babel-node main.js').exec()
    .pipe(rename('server.log'))
    .pipe(gulp.dest('logs'));
});

gulp.task('watch', function () {
  gulp.watch(['services/**/*.js', 'api/**/*.js'], ['spec']);
  gulp.watch([PUBLICDIR + 'js/**/*'], ['spec']);
});

gulp.task('live', ['run'], function () {
  reload.listen();
  gulp.watch([PUBLICDIR + 'js/**/*'], ['browserify']);
  gulp.watch(PUBLICDIR + 'styles/**/*.less', ['less']);
  gulp.watch([PUBLICDIR + 'index.html', PUBLICDIR + 'img/**/*', PUBLICDIR + 'templates/**/*'], ['static']);
});
