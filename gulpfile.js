var gulp = require('gulp');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserSync = require('browser-sync').create();

function handleError(e) {
  console.log(e.toString());
}

gulp.task("js", function () {
  return gulp.src("js/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({
      stream: true
    })).on('error', handleError);;
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})


gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./css/*.css')
      .pipe(postcss([ autoprefixer({ browsers: ['> 5%'] }) ]))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.reload({
        stream: true
      })).on('error', handleError);;
});

gulp.task('default', ['browserSync', 'js', 'css'], function () {
    gulp.watch(['./js/*.js', './css/*.css', 'index.html'] , ['css', 'js']);
});