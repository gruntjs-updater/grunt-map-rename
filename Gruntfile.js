/*
 * grunt-map-rename
 * https://github.com/b263/grunt-map-rename
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		copy: {
			test: {
				files: [
					{
						src: ['test/fixtures/*.txt'],
						dest: 'tmp/',
						expand: true,
						flatten: true
					}
				]
			}
		},

		// Configuration to be run (and then tested).
		map_rename: {
			default: {
				options: {
					map: 'test/fixtures/map.json'
				},
				files: [
					{
						src: ['tmp/*']
					}
				]
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	grunt.loadTasks('tasks');

	require('grunt-task-loader')(grunt);

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'copy', 'map_rename', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
