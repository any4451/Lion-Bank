const { src, dest, task, series, watch, parallel} = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const { notify } = require('browser-sync');
const env = process.env.NODE_ENV;
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const styles = [
'node_modules/normalize.css/normalize.css',
'src/css/style.scss',
];


task('clean', () => {
    return src('dist/**/*', {read: false})
        .pipe(clean());
});


task ('copy:html', () => {
    return src('src/*.html').pipe(dest('dist'))
});

task ('images', () => {
  return src('src/img/**/*')
  // .pipe(imagemin())
  .pipe(dest('dist/img'))
});


// const libs = [
//   'node_modules/jquery/dist/jquery.js',
//   'src/js/*.js'
// ];

task('scripts', () => {
  return src('src/js/*.js')
  .pipe(gulpIf(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.js', {newLine: ';'}))
  .pipe(babel({
    presets: ['@babel/env']
}))
  .pipe(uglify())
  .pipe(gulpIf(env === 'dev', sourcemaps.write()))
  .pipe(dest('./dist'));
})

task('styles', () => {
    return src(styles)
      .pipe(gulpIf(env === 'dev', sourcemaps.init()))
      .pipe(concat('style.min.scss'))
      .pipe(sassGlob())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
      // .pipe(gulpIf(env === 'prod', gcmq()))
      .pipe(cleanCSS())
      .pipe(gulpIf(env === 'dev', sourcemaps.write()))
      .pipe(dest('./dist'));
  });


task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "reviews.html"
        },
        notify: false
    });
});



task('watch', () => {
  watch('./src/**/*.scss', series ('styles'));
  watch('./src/*.html', series ('copy:html'));
  watch('./src/**/*.js', series ('scripts'));
})

task ('default',
 series( 
 parallel ('copy:html', 'styles', 'scripts', 'images'), 
 parallel('watch', 'browser-sync')));

 task ('build',
 series('clean', 
 parallel ('copy:html', 'styles', 'scripts', 'images')));