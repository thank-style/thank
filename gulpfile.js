const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const mqpacker = require("css-mqpacker");
const postcss = require("gulp-postcss");
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const runSequence = require('run-sequence');

gulp.task('default', function(){
  runSequence(['scripts', 'stylus']);
});

gulp.task('stylus', function(){
  gulp.src('webroot/css/stylus/app.styl')
  .pipe(plumber())
  .pipe(
    stylus({
      use: [nib()],
      include: 'node_modules',
      compress: true,
      'include css': true,
    }))
  .pipe(postcss([
    mqpacker,
    autoprefixer({
      browsers:['Android >= 4.4', 'iOS >= 8']
    })
  ]))
  .pipe(gulp.dest('webroot/css'))
});

gulp.task('scripts', function(){
  browserify({
    entries: ['webroot/js/modules/app.js'],
    debug: true
  })
  .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('webroot/js'))
});

