(function (r, gulp) {
	var refresh = require('gulp-livereload'),
		lrserver = require('tiny-lr')();

	gulp.task('templates', function() {
	  	gulp.src('./app/templates/*.html')
	  	.pipe(gulp.dest('www/templates/'))
	  	.pipe(refresh(lrserver));
	});   

	gulp.watch(['www/index.html', 'app/templates/*.html'], [
	 	'templates'
	]); 

}(require, require('gulp')));