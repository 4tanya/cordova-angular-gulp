(function (r, gulp) {
    var gutil = r('gulp-util'),
	    jshint = r('gulp-jshint'),
	    browserify = r('gulp-browserify'),
	    concat = r('gulp-concat'),
	    clean = r('gulp-clean');

	gulp.task('lint', function() {
	  gulp.src('./app/**/*.js')
	  .pipe(jshint())
	  .pipe(jshint.reporter('default'));
	});

	gulp.task('browserify', function() {
		gulp.src(['app/app.js'])
		.pipe(browserify({
		    insertGlobals: true,
		    debug: true
		}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('www/js'));
	});

	gulp.task('watch', ['lint'], function() {
	  	gulp.watch(['app/*.js', 'app/**/*.js'],[
	    	'lint',
	    	'browserify'
	  	]);
	});
    
}(require, require('gulp')));