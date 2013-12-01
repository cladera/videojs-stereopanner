module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: {
                src: ['src/js/*.js'],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },
        concat: {
            build: {
                options: {},
                src: [
                    'src/js/audiopanner.js'
                ],
                dest:'build/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    '* Author: <%= pkg.author %> */ \n'
            },
            build: {
                src: 'build/js/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });
    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the plugin that provides the "cssmin" taks.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};