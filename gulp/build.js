(function (r, gulp) {
    var connect = r('gulp-connect');
    var useref = r('useref');
    var del = r('del');
    var htmlmin = r('gulp-htmlmin');

    gulp.task('connect', function () {
    	connect.server({
    		root: 'www',
    		port: 5000
    	});
    });

    gulp.task('useref', function () {
        return gulp.src('www/index.html')
            .pipe(useref())
            .pipe(gulp.dest('www/'));
    });

    gulp.task('minify', function() {
        return gulp.src('app/templates/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('www/templates'))
    });

    gulp.task('clean', function(cb) {
        del(['www/**/*', '!www/index.html', '!www/index_old.html'], cb)
    });
    gulp.task('build', ['clean', 'lint', 'browserify', 'bower', 'icons', 'scss', 'minify', 'useref']);
    gulp.task('prod', ['build', 'connect']);

}(require, require('gulp')));