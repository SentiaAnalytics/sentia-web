'use strict';
var gulp = require('gulp'),
  watch = require('gulp-watch'),
  config = require('config'),
  P = require('bluebird'),
  mocha = require('gulp-mocha'),
  browserify = require('gulp-browserify'),
  less = require('gulp-less'),
  shell = require('gulp-shell'),
  server,
  rename = require('gulp-rename'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps'),
  jshint = require('gulp-jshint');

gulp.task('unit', function() {
  return gulp.src(['test/routes/**/*.js', 'test/services/**/*.js', 'test/middleware/**/*.js'])
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('rest', ['run'],function() {
  return gulp.src(['test/REST/**/*.js'])
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('end',function () {
      gulp.start('stop');
    });
});


gulp.task('watch', function() {
  return gulp.watch([
      'server.js',
      'routes/**/*.js',
      'services/**/*.js',
      'test/**/*.js'
    ], ['unit']);
});

gulp.task('jshint', function() {
  return gulp.src([
    '**/*.js',
    '!test/**',
    '!node_modules/**',
    '!app/js/lib/**',
    '!app/build/**',
    '!gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('test', ['jshint', 'unit']);


gulp.task('less', function () {
  return gulp.src('app/styles/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/build/'))
    .pipe(livereload());
});

gulp.task('browserify', function () {
  return gulp.src('app/js/app.js')
    .pipe(browserify({
      debug : true,
      transform : ['debowerify']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('app/build/'))
    .pipe(livereload());
});
gulp.task('build', ['less', 'browserify']);

gulp.task('run', function () {
  console.log('port:', config.port);
    return require('./server').start()
      .then(function (s) {
        server = s;
      });
});

gulp.task('stop', function () {
  return new P(function (resolve) {
    require('./server').stop(function () {
      return resolve('done');
    });
  });
});

gulp.task('default',['build', 'run']);

gulp.task('live', ['less', 'browserify', 'run'], function() {
  livereload.listen();
  gulp.watch('app/styles/**/*.less', ['less']);
  gulp.watch('app/js/**/*.js', ['browserify']);
  gulp.watch([
     'app/views/**',
     'app/images/**',
     'app/index.html'
  ])
    .on('change', livereload.changed);
});
