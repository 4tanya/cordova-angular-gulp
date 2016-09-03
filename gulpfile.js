var gulp = require('gulp');
var connect = require('gulp-connect');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

var sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    sassPath: './sass',
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

gulp.task('css', function(){
    return sass(config.sassPath + '/style.scss',{
            style: 'compressed',
            loadPath:[
                './sass',
                config.bowerDir+'/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss'
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
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['connect', 'bower', 'icons', 'css', 'browserify', 'copy', 'watch']);