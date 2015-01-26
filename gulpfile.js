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
  minifyCSS = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps');

//###########
//#build
//###########

gulp.task('watch', function() {
  return gulp.watch([
      'server.js',
      'routes/**/*.js',
      'services/**/*.js',
      'test/**/*.js'
    ], ['unit']);
});

gulp.task('clean', function () {
  gulp.src(['app/build/bundle.*', 'app/build/style.*'])
    .pipe(clean());
});

gulp.task('less-dev', function () {
  return gulp.src('app/styles/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/build/'))
    .pipe(livereload());
});
gulp.task('less', function () {
  return gulp.src('app/styles/style.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gzip())
  .pipe(gulp.dest('app/build/'))
  .pipe(livereload());
});

gulp.task('browserify', function () {
  return gulp.src('app/js/app.js')
    .pipe(browserify({
      debug : false,
      transform : ['debowerify']
    }))
    .pipe(rename('bundle.js'))
    .pipe(uglify({
      mangle : false
    }))
    .pipe(gzip())
    .pipe(gulp.dest('app/build/'))
    .pipe(livereload());
});

gulp.task('browserify-dev', function () {
  return gulp.src('app/js/app.js')
  .pipe(browserify({
    debug : true,
    transform : ['debowerify']
  }))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('app/build/'))
  .pipe(livereload());
});

gulp.task('compress', function () {
  return gulp.src('app/build/bundle.js')
    .pipe(uglify({
      mangle : false
    }))
    .pipe(gzip())
    .pipe(gulp.dest('app/build/'));
});

gulp.task('build', function (done) {
   run('clean', ['browserify','less'], 'compress', done);
});
gulp.task('build-dev', function (done) {
  run(['clean', 'browserify-dev', 'less-dev'], done);
});

//###########
//# Test
//###########

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

gulp.task('unit', function() {
  var mocha = require('gulp-mocha');
  // return gulp.src(['test/routes/**/*.js', 'test/services/**/*.js', 'test/middleware/**/*.js'])
  return gulp.src(['test/routes/**/*.js', 'test/services/**/*.js', 'test/middleware/**/*.js', 'test/app/**/*.test.js'])
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

gulp.task('test', ['jshint', 'unit']);

gulp.task('cuke', function (done) {
  run(['run', 'cucumber', 'stop'], done);
});

//###########
//#run
//###########

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
  gulp.watch('app/styles/**/*.less', ['less-dev']);
  gulp.watch('app/js/**/*.js', ['browserify-dev']);
  gulp.watch([
     'app/views/**',
     'app/images/**',
     'app/index.html'
  ])
    .on('change', livereload.changed);
});
