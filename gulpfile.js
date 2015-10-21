var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css');

//uglify js
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('theme/js/*.js')
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
});

//uglify css
gulp.task('css', function () {
    // 1. 找到文件
    gulp.src('frontend/css/*.css')
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css'));
});

// Default
gulp.task('default', ['script','css']);