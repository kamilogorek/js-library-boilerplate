'use strict';

module.exports = function (grunt) {
    var fs = require('fs');
    var UglifyJS = require('uglify-js');

    require('load-grunt-tasks')(grunt);

    var banner = '/**\n' +
         '* js-library-boilerplate 0.0.1\n' +
         '* https://github.com/kamilogorek/js-library-boilerplate\n' +
         '* Public Domain - 2013 Kamil Ogórek\n' +
         '*/\n\n';

    grunt.initConfig({
        watch: {
            options: {
                livereload: true
            },
            static: {
                files: ['src/**/*.js', '**/*.html', '**/*.css'],
                tasks: ['jshint']
            },
            requirejs: {
                files: ['src/**/*.js', '**/*.html', '**/*.css'],
                tasks: ['jshint', 'requirejs:dev']
            },
            browserify: {
                files: ['src/**/*.js', '**/*.html', '**/*.css'],
                tasks: ['jshint', 'browserify:dev']
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    livereload: true,
                    open: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/main-requirejs.js', 'src/main-browserify.js']
            },
            files: ['src/**/*.js']
        },
        requirejs: {
            dev: {
                options: {
                    baseUrl: './src/',
                    name: 'main-requirejs.src',
                    out: './src/main-requirejs.js',
                    findNestedDependencies: true,
                    optimize: 'none'
                }
            },
            build: {
                options: {
                    baseUrl: './src/',
                    name: '../bower_components/almond/almond',
                    include: ['main-requirejs.src'],
                    insertRequire: ['main-requirejs.src'],
                    out: './main.js',
                    findNestedDependencies: true,
                    optimize: 'none',
                    preserveLicenseComments: false,
                    done: function () {
                        console.log('\nλ Code compiled successfully!');

                        var minifiedSrc = banner + UglifyJS.minify('main.js').code;

                        fs.writeFileSync('main.min.js', minifiedSrc);
                        console.log('λ Code minified successfully!\n');
                    },
                    wrap: {
                        start: banner + '(function () {',
                        end: '}).call(this);'
                    },
                }
            }
        },
        browserify: {
            dev: {
                files: {
                    './src/main-browserify.js': ['./src/main-browserify.src.js'],
                }
            },
            build: {
                files: {
                    './main.js': ['./src/main-browserify.src.js']
                },
                options: {
                    postBundleCB: function (err, src, next) {
                        if (err) { throw err; }
                        console.log('\nλ Code compiled successfully!');

                        var modifiedSrc = banner + '(function () {' + src + '}).call(this);';
                        var minifiedSrc = banner + UglifyJS.minify(modifiedSrc, { fromString: true }).code;

                        fs.writeFileSync('main.min.js', minifiedSrc);
                        console.log('λ Code minified successfully!\n');

                        next(err, modifiedSrc);
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('server', function () {
        grunt.task.run(['connect', 'watch:static']);
    });
    grunt.registerTask('server:requirejs', function () {
        grunt.task.run(['requirejs:dev', 'connect', 'watch:requirejs']);
    });
    grunt.registerTask('server:browserify', function () {
        grunt.task.run(['browserify:dev', 'connect', 'watch:browserify']);
    });

    grunt.registerTask('build:requirejs', ['jshint', 'requirejs:build']);
    grunt.registerTask('build:browserify', ['jshint', 'browserify:build']);

    grunt.registerTask('default', function () {
        throw new Error('\n\nPlease select server your choice by using one of options below:' +
            '\nλ `server` to run static server' +
            '\nλ `server:requirejs` for AMD style modules' +
            '\nλ `server:browserify` for CJS style modules');
    });
};
