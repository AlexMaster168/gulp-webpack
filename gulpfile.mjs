import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-html-minifier-terser';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const server = browserSync.create();

const cssFiles = ['./src/css/**/*.css'];
const htmlFiles = ['index.html'];

const images = [
  './Картинки/*.png',
  './Картинки/*.jpg',
  './Картинки/*.gif',
];

function styles() {
  return src(cssFiles)
    .pipe(cleanCSS({ level: 2 }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename({ basename: 'style' }))
    .pipe(dest('./build/css'))
    .pipe(server.stream());
}

function webpackBuild(done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) console.error(err.details);
      done(err);
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors.map((e) => e.message).join('\n'));
      done(new Error('Webpack errors'));
      return;
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings.map((w) => w.message).join('\n'));
    }
    console.log(stats.toString({ colors: true, modules: false }));
    done();
  });
}

function copyImages() {
  return src(images)
    .pipe(rename({ suffix: '.min', prefix: 'img-' }))
    .pipe(dest('./build/img'));
}

function html() {
  return src(htmlFiles)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest('./build'));
}

function clean() {
  return deleteAsync(['build/*']);
}

function serve(done) {
  server.init({
    server: { baseDir: './build' },
    port: 3000,
    open: false,
    notify: false,
  });
  watch('./src/css/**/*.css', styles);
  watch('./src/js/**/*.js', series(webpackBuild, (cb) => { server.reload(); cb(); }));
  watch('./*.html', series(html, (cb) => { server.reload(); cb(); }));
  done();
}

const build = series(clean, parallel(styles, webpackBuild, html, copyImages));
const dev = series(build, serve);

export { styles, webpackBuild, html, copyImages as image, clean, serve, build, dev };
export default build;
