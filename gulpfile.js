const {src, dest, watch, parallel, series } = require('gulp');

const less = require('gulp-less');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require("gulp-sourcemaps");
 const cssmin = require('gulp-cssmin');


function browsersync2(){
    browserSync.init({
        server: {
            baseDir: "app/",
            directory: true
        }
    });
}

function cleanDist() {
    return del('dist')
}
function styles() {
    return src('app/scss/*.scss')
        .pipe(scss({outputStyle: 'expanded'}))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer({
            overrideBrowserslist : ['last 5 version'],
            grid: true
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}


function build() {
    return src([
        'app/css/*.css',
        'app/fonts/**/*',
        'app/js/*.js',
        'app/img/**/*',
        'app/*.html'
], {base:'app'})
    .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync2;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, build);
exports.default = parallel(browsersync2,watching)