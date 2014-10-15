/* global __dirname */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var tagVersion = require('gulp-tag-version');
var templateCache = require('gulp-angular-templatecache');

var karma = require('karma').server;

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var runSequence = require('run-sequence');

var config = {};

config.app = 'app';
config.build = 'build';

config.html = {
    files: [
        'app/**/*.html',
        '!app/bower_components/**'
    ]
};

config.js = {
    files: [
        'gulpfile.js',
        'app/**/*.js',
        '!app/bower_components/**/*.js',
        '!app/templates.js'
    ]
};

config.scss = {
    files: [
        'app/assets/stylesheets/partials/**/*.scss'
    ],
    src: 'app/app.scss',
    devDest: 'app/app.css',
    buildDest: 'build/app.css'
};

var release = function(importance) {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe($.git.commit('bumps package version'))
        .pipe($.filter('bower.json'))
        .pipe(tagVersion());
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('clean', function(cb) {
    require('del')([config.build], {
        force: true
    }, cb);
});

gulp.task('compile-templates', function() {
    gulp.src(config.html.files)
        .pipe($.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            caseSensitive: true
        }))
        .pipe(templateCache({
            moduleSystem: 'RequireJS',
            standalone: true
        }))
        .pipe(gulp.dest(config.app));
});

gulp.task('convert', function() {
    gulp.src(config.app + 'bower_components/**/*.css')
        .pipe($.rename({
            extname: '.copy.scss'
        }))
        .pipe(gulp.dest(config.app + 'bower_components/'));
});

gulp.task('copy', function() {
    gulp.src(config.appDir + '**/*.html')
        .pipe(gulp.dest(config.build));
});

gulp.task('jshint', function() {
    gulp.src(config.js.files)
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('requirejs', function() {
    $.requirejs({
            mainConfigFile: config.app + '/config.js',
            baseUrl: config.app,
            name: 'app',
            out: 'app.js',
            useStrict: true,
            optimizeCss: 'none',
            generateSourceMaps: false,
            optimize: 'uglify2',
            preserveLicenseComments: true
        })
        .pipe(gulp.dest(config.build));
});

gulp.task('scss-dev', function(cb) {
    gulp.src(config.scss.src)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        // .pipe($.autoprefixer('last 2 versions'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.app))
        .pipe(reload({
            stream: true
        }));
    cb();
});

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('watch', function() {
    $.watch(config.scss.files, function(files, cb) {
        gulp.start('scss-dev', cb);
    });
    $.watch(config.html.files, function(files, cb) {
        gulp.start('compile-templates', cb);
    });
});

gulp.task('default', [
    'browser-sync',
    'compile-templates',
    'scss-dev',
    'watch'
]);

gulp.task('build', []);

gulp.task('patch', ['build'], function() {
    return release('patch');
});

gulp.task('feature', ['build'], function() {
    return release('minor');
});

gulp.task('release', ['build'], function() {
    return release('major');
});
