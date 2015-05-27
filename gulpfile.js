'use strict';
//modules
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var reload = require('gulp-livereload');
var mocha = require('gulp-spawn-mocha');
var run = require('gulp-run');
require('babel/register');
//constants
var PUBLICDIR = 'app/';
require('./gulp/tests');

// BUILD
gulp.task('webpack', function () {

  var webpackConfig = {
      devtool: "#inline-source-map",
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
      }
    };
  return gulp.src(PUBLICDIR + 'js/main.js')
    .pipe(webpack(webpackConfig))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(PUBLICDIR));
});

gulp.task('less', function () {
    return gulp.src(PUBLICDIR + 'styles/style.less')
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(PUBLICDIR));
});

gulp.task('static'  , function () {
  reload();
});

gulp.task('build', ['less', 'webpack', 'static']);

// TEST



gulp.task('run', ['build'], function (done) {
  done();
  run('node node_modules/.bin/babel-node main.js').exec()
    .pipe(rename('server.log'))
    .pipe(gulp.dest('logs'));
});

gulp.task('watch', ['run'], function () {
  reload.listen();
  gulp.watch(['services/**/*.js', 'api/**/*.js'], ['spec']);
  gulp.watch([PUBLICDIR + 'js/**/*', PUBLICDIR + 'spec/**/*'], ['spec', 'webpack']);
  gulp.watch(PUBLICDIR + 'styles/**/*.less', ['less']);
  gulp.watch([PUBLICDIR + 'index.html', PUBLICDIR + 'img/**/*', PUBLICDIR + 'templates/**/*'], ['static']);
});
