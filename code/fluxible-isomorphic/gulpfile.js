var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack-build');
var path = require('path');
var del = require('del');
var webpackConfigPath = './webpack.config.js';

gulp.task('default', ['clean', 'nodemon:app', 'webpack:dev']);

gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('nodemon:app', ['clean'], function () {
    nodemon({
      script: './bootstrap.js',
      ignore: ['build/**', 'node_modules/**'],
      ext: 'js'
    });
});

gulp.task('webpack:dev', ['clean'], function() {
    gulp.src(path.resolve(webpackConfigPath))
        .on('error', gutil.log)
        .pipe(webpack.run())
        .on('error', gutil.log);
});
