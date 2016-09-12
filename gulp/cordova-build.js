(function (r, gulp) {
	var del = r('del'),
    	cordova = r('cordova-lib').cordova.raw;

	gulp.task('cordova:compile', [ 'clean', 'build' ]);

    gulp.task('cordova:build', [ 'cordova:compile' ], function(cb) {
	    process.chdir(__dirname);
	    cordova
	        .build()
	        .then(function() {
	            cb();
	        });
	});

	gulp.task('cordova:emulate', [ 'cordova:build' ], function(cb) {
	    process.chdir(__dirname);
	    cordova
	        .run({ platforms: [ 'android' ] })
	        .then(function() {
	            cb();
	        });
	});

}(require, require('gulp')));