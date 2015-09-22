  'use strict';
var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');

var mochaReporter = process.env.CIRCLE_TEST_REPORTS ? 'mocha-junit-reporter': 'dot';

gulp.task('spec',function () {
    return gulp.src([
      'app/js/**/_spec/**/*.js'
      ])
      .pipe(mocha({
          compilers: 'js:babel/register',
        reporter: mochaReporter,
        // reporter: 'dot',
      }));
});

gulp.task('resttest', function () {
  return gulp.src(['test/setup.js','test/**/*.js'])
    .pipe(mocha({
      reporter: mochaReporter,
      // reporterOptions: {
      //   mochaFile: mochaReportPath + '/rest.xml'
      // },
      compilers: 'js:babel/register'
    }));
});

gulp.task('test', ['spec', 'resttest']);

gulp.task('watch', ['spec'], function () {
  gulp.watch(['services/**/*.js', 'api/**/*.js'], ['spec']);
  gulp.watch(['app/js/**/*'], ['spec']);
});
