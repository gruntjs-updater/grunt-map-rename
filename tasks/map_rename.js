/*
 * grunt-map-rename
 * https://github.com/b263/grunt-map-rename
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
	MapRenamer = require('../lib/MapRenamer');

module.exports = function (grunt) {

	grunt.registerMultiTask('map_rename', 'Rename files according to mapping data', function () {
		var options = this.options({}),
			map = require(path.resolve(options.map)),
			mapRenamer = new MapRenamer(grunt, this.files, map);
		mapRenamer.run();
	});

};
