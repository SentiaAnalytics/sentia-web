'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var reload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var gzip =  require('gulp-gzip');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browserify', function () {
  var b = browserify({
    entries: ['./app/js/main.js'],
    debug: true,
    extensions: ['.jsx'],
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  });
  // set up the browserify instance on a task basis
  return b.bundle()
    .on('error', function (err) {
      console.log(err.stack);
      this.emit('end');
    })
    .pipe(source('app/js/main.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./app'))
    .pipe(reload());
});

gulp.task('less', function () {
    return gulp.src('app/styles/style.less')
      .pipe(sourcemaps.init())
      .pipe(less())
      .on('error', function (err) {
        console.log(err.stack);
        this.emit('end');
      })
      // .pipe(autoprefixer({browsers: ['last 2 versions']}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app'))
      .pipe(reload());
});

gulp.task('browserify-prod', function () {
  var b = browserify({
    entries: ['./app/js/main.js'],
    extensions: ['.jsx'],
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  });
  // set up the browserify instance on a task basis
  return b.bundle()
    .pipe(source('app/js/main.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app'));
});

gulp.task('less-prod', function () {
    return gulp.src('app/styles/style.less')
      .pipe(less())
      .on('error', function (err) {
        console.log(err.stack);
        this.emit('end');
      })
      .pipe(autoprefixer({browsers: ['last 4 versions']}))
      // .pipe(minifyCSS())
      .pipe(gulp.dest('app'));
});

gulp.task('build', ['less', 'browserify', 'static']);
gulp.task('build-prod', ['less-prod', 'browserify-prod', 'static']);

gulp.task('live',['build'], function () {
  reload.listen();
  gulp.watch(['app/js/**/*'], ['browserify']);
  gulp.watch('app/styles/**/*.less', ['less']);
  gulp.watch(['app/index.html', 'app/img/**/*', 'app/templates/**/*'], ['static']);
});
