const gulp = require('gulp');
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './src/css/main.css'
]

function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

const jsFiles = [ 
    './src/js/main.js'
]

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}
gulp.task('styles1', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));