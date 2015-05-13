'use strict';
var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');

gulp.task('spec',function () {
    return gulp.src([
      'app/js/**/spec/**/*.js',
      'test/**/spec/**/*.js'
      ])
      .pipe(mocha({
        reporter: 'dot',
        compilers: 'js:babel/register'
      }));
});

gulp.task('resttest', function () {
  return gulp.src(['test/setup.js','test/**/*.js'])
    .pipe(mocha({
      reporter: 'dot',
      compilers: 'js:babel/register'
    }));
});

gulp.task('test', ['spec', 'resttest']);
