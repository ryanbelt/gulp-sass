'use strict';
/*
    change the sass build setting
*/
const SASS_SRC = '/home/keypathvm/Keypath/dev/gulp-sass/sass';
const SASS_DEST = '/home/keypathvm/Keypath/dev/gulp-sass/css';
/* --------------------------------------------------*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var postCSS = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');
var autoprefixer = require('autoprefixer');

const SASS_SRC_FILES = SASS_SRC + '/**/*.scss';

sass.compiler = require('node-sass');

function clean() {
  return del(SASS_DEST);
}

function styles() {
  return gulp.src(SASS_SRC_FILES)
    .pipe(sass().on('error', sass.logError))
    .pipe(postCSS([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'style',
    }))
    .pipe(gulp.dest(SASS_DEST));
}

function watch(next) {
  gulp.watch(SASS_SRC_FILES, styles);
  return next();
}

var build = gulp.series(clean, gulp.parallel(styles));

exports.default = build;
exports.watch = watch;