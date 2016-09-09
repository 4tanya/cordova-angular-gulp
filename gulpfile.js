(function (r) {
    var gulp = r('gulp');
    var connect = r('gulp-connect');

    var browserify = r('browserify');
    var source = r('vinyl-source-stream');

    var sass = r('gulp-ruby-sass'),
        notify = r("gulp-notify"),
        bower = r('gulp-bower');

    var config = {
        scssPath: './scss',
        bowerDir: './bower_components'
    };

    gulp.task('connect', function () {
    	connect.server({
    		root: 'www',
    		port: 4000
    	});
    });

    gulp.task('browserify', function() {
        return browserify('./app/app.js')
            .bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./www/js/'));
    });

    gulp.task('bower', function(){
        return bower()
            .pipe(gulp.dest(config.bowerDir));
    });

    gulp.task('icons', function(){
        return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
            .pipe(gulp.dest('./www/fonts'));
    });

    gulp.task('sass', function(){
        return sass(config.scssPath + '/style.scss',{
            style: 'compressed',
            loadPath:[
                './scss'
            ]
        })
        .on('error',notify.onError(function(error){
            return 'Error: '+ error.message;
        }))
        .pipe(gulp.dest('./www/css'));
    });

    gulp.task('copy', function () {
        gulp.src('./app/templates/**/*.html')
            .pipe(gulp.dest('./www/templates'));
    });

    gulp.task('watch', function() {
    	gulp.watch('./app/**/*.js', ['browserify']);
        gulp.watch(config.scssPath + '/**/*.scss', ['scss']);
    });

    gulp.task('default', ['connect', 'bower', 'icons', 'scss', 'browserify', 'copy', 'watch']);

}(require));