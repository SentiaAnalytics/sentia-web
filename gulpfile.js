'use strict';
var gulp = require('gulp'),
  watch = require('gulp-watch'),
  clean = require('gulp-clean'),
  config = require('config'),
  run = require('run-sequence'),
  P = require('bluebird'),
  browserify = require('gulp-browserify'),
  gzip = require('gulp-gzip'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  shell = require('gulp-shell'),
  server,
  rename = require('gulp-rename'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps');


gulp.task('unit', function() {
  var mocha = require('gulp-mocha');
  // return gulp.src(['test/routes/**/*.js', 'test/services/**/*.js', 'test/middleware/**/*.js'])
  return gulp.src(['test/routes/**/*.js', 'test/services/**/*.js', 'test/middleware/**/*.js'])
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('cucumber', function () {
  var cucumber = require('gulp-cucumber');
  return gulp.src('test/features/*.feature')
    .pipe(cucumber({
      'steps': 'test/features/steps/*.js',
      'support': 'test/features/support/*.js',
      'format': 'summary'
    }));
});

gulp.task('startstop', function (done) {
  run(['run', 'stop'], done);
});

gulp.task('cuke', function (done) {
  run(['run', 'cucumber', 'stop'], done);
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
  var jshint = require('gulp-jshint');
  return gulp.src([
    '**/*.js',
    '!test/**',
    '!node_modules/**',
    '!app/bower_components/**',
    '!app/build/**',
    '!gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('test', ['jshint', 'unit']);


gulp.task('clean-js', function () {
  gulp.src(['app/build/bundle.js', 'app/build/bundle.js.gz'])
    .pipe(clean());
});

gulp.task('less', function () {
  return gulp.src('app/styles/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/build/'))
    .pipe(livereload());
});

gulp.task('browserify', ['clean-js'], function () {
  return gulp.src('app/js/app.js')
    .pipe(browserify({
      debug : true,
      transform : ['debowerify']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('app/build/'))
    .pipe(livereload());
});

gulp.task('compress-js', function () {
  return gulp.src('app/build/bundle.js')
    .pipe(uglify({
      mangle : false
    }))
    .pipe(gzip())
    .pipe(gulp.dest('app/build/'));
});

gulp.task('build', function (done) {
   run(['browserify','less'], 'compress-js', done);
});
gulp.task('build-dev', function (done) {
  run(['browserify','less'], done);
});

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

gulp.task('default', function () {
  run('build', 'run');
});

gulp.task('live', ['build-dev', 'run'], function() {
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
