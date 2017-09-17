module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            libs: {
                src: [
                    'src/vendor/jquery-3.1.1.min.js',
                    'src/vendor/underscore-min.js',
                    'src/vendor/jquery.inputmask.bundle.min.js',
                    'src/vendor/js.cookie.min.js'
                ],
                dest: 'www/assets/js/libs.min.js'
            },
            css_libs: {
                src: [
                    'src/css/normalize.min.css'
                ],
                dest: 'www/assets/css/libs.min.css'
            },
            dist: {
                options: {
                    sourceMap: true
                },
                src: [
                    'src/js/reset.js',
                    'src/js/config.js',
                    'src/js/utils.js',
                    'src/js/utils/**/*.js',
                    'src/js/model/**/*.js',
                    'src/js/view/**/*.js',
                    'src/js/app.js'
                ],
                dest: 'tmp/app.concat.js'
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapIn: 'tmp/app.concat.js.map'
                },
                files: {
                    'www/assets/js/app.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        sass: {
            options: {
                style: 'compact'
            },
            dist: {
                files: {
                    'tmp/app.css': 'src/scss/application.scss'
                }
            }
        },
        autoprefixer: {
            options: {
            },
            dist: {
                files: {
                    'www/assets/css/app.min.css': 'tmp/app.css'
                }
            }
        },
        watch: {
            javascript: {
                files: ['<%= concat.dist.src %>'],
                tasks: ['concat:dist', 'uglify:dist']
            },
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            svg: {
                files: ['src/svg/sprite.svg'],
                tasks: ['svgmin']
            }
        },
        svgmin: {
            dist: {
                files: {
                    'www/assets/svg/sprite.svg': 'src/svg/sprite.svg'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-inline-css');



    // Default task(s).
    grunt.registerTask('default', ['watch']);

};