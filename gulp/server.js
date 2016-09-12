(function (r, gulp) {
    var embedlr = require('gulp-embedlr'),
        refresh = require('gulp-livereload'),
        lrserver = require('tiny-lr')(),
        express = require('express'),
        livereload = require('connect-livereload'),
        livereloadport = 35729,
        serverport = 4000;

    var server = express();
    server.use(livereload({port: livereloadport}));
    server.use(express.static('./www'));
    server.all('/*', function(req, res) {
        res.sendfile('index.html', { root: 'www' });
    }); 

    gulp.task('dev', ['lint', 'browserify', 'bower', 'icons', 'scss', 'templates'], function() {
        server.listen(serverport);
        lrserver.listen(livereloadport);
        gulp.run('watch');
    });   

}(require, require('gulp')));