/*
 * grunt
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Configuration to be run (and then tested).
    nodewebkit: {
      options: {
        mac: true,
        build_dir: './'
      },
      src: './app'
    },

  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
