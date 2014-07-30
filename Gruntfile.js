/**
 * Grunt
 */
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'angular-toggle.js': 'angular-toggle.coffee'
        }
      }
    },
    ngmin: {
      compile: {
        src: ['angular-toggle.js'],
        dest: 'angular-toggle.js'
      }
    }
  });

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  /**
   * Build
   */
  grunt.registerTask('build', [
    'coffee',
    'ngmin'
  ]);

  /**
   * Default to build
   */
  grunt.registerTask('default', ['build']);
};
