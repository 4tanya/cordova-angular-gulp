(function (r, gulp) {
	var sass = r('gulp-ruby-sass'),
        notify = r("gulp-notify"),
        bower = r('gulp-bower');

    var config = {
        scssPath: './scss',
        bowerDir: './bower_components'
    };

    gulp.task('bower', function(){
        return bower()
            .pipe(gulp.dest(config.bowerDir));
    });

    gulp.task('icons', function(){
        return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
            .pipe(gulp.dest('./www/fonts'));
    });

    gulp.task('scss', function(){
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

    gulp.task('watch', function() {
        gulp.watch(config.scssPath + '/**/*.scss', ['bower', 'icons', 'scss']);
    });

}(require, require('gulp')));