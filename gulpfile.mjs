import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-html-minifier-terser';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const server = browserSync.create();

const cssFiles = [
  './src/css/main.css',
  './src/css/media.css'
];

const jsFiles = [
  './src/js/lib.js',
  './src/js/main.js'
];

const htmlFiles = [
  'index.html'
];

const images = [
  './Картинки/a3a26cf09f355c2e1da4cd08fc7d2b83.png',
  './Картинки/dd2732908e5f59670b3338eef9551bb4.jpg',
  './Картинки/prostoy-calendar-2020.gif',
  './Картинки/s.jpg',
  './Картинки/s2.jpg',
  './Картинки/s3.jpg'
];

function styles() {
  return src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest('./build/css'))
    .pipe(server.stream());
}

function scripts() {
  return src(jsFiles)
    .pipe(concat('script.js'))
    .pipe(uglify({ toplevel: true }))
    .pipe(dest('./build/js'))
    .pipe(server.stream());
}

function copyImages() {
  return src(images)
    .pipe(rename({
      suffix: '.min',
      prefix: 'img-',
      extname: '.png'
    }))
    .pipe(dest('./build/img'));
}

function html() {
  return src(htmlFiles)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest('.'));
}

function clean() {
  return deleteAsync(['build/*']);
}

function serve(done) {
  server.init({
    server: { baseDir: './' }
  });
  watch('./src/css/**/*.css', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./*.html').on('change', server.reload);
  done();
}

const build = series(clean, parallel(styles, scripts, html));
const dev = series(build, serve);
const delImage = series(clean, copyImages);

export { styles, scripts, html, clean, serve, copyImages as image, delImage, build, dev };
export default build;
