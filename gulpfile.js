var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var zip = require('gulp-zip');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('sass', function() {
    return gulp.src(['app/scss/**/*.scss', 'app/css/bootstrap.min.css']) // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})



gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    // Other watchers
});

gulp.task('useref', function() {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});



gulp.task('css', function() {
    return gulp.src('app/css/**/*')
        .pipe(gulp.dest('dist/app/css'))
})

gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('dist/images'))
});
gulp.task('videos', function() {
    return gulp.src('videos/**/*')
        .pipe(gulp.dest('dist/videos'))
});

gulp.task('js', function() {
    return gulp.src('js/**/*')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('zip', ['css', 'images', 'videos', 'js', 'html'], function() {
    return gulp.src('dist/**/*')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest(''));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})