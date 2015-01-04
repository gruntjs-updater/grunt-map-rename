/*
 * grunt-map-rename
 * https://github.com/b263/grunt-map-rename
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
	_ = require('lodash');

module.exports = function (grunt) {

	grunt.registerMultiTask('map_rename', 'Rename files according to mapping data', function () {
		var options = this.options({}),
			map = require(path.resolve(options.map));

		this.files.forEach(function (f) {
			f.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).forEach(function (filepath) {
				var newPaths = getNewPaths(filepath, map),
					isRenamed = false;
				newPaths.forEach(function (newPath) {
					if (filepath !== newPath) {
						grunt.file.copy(filepath, newPath);
						isRenamed = true;
					}
				});
				if (isRenamed) {
					grunt.file.delete(filepath);
				}
			});
		});
	});

	function getNewPaths(filepath, map) {
		var dir = filepath.replace(/[^\/]+$/, ''),
			filename = filepath.replace(/^.*[\/]/, ''),
			newPaths = [],
			match = false;
		_.forIn(map, function (replace, search) {
			if (match) return;
			search = new RegExp(search);
			replace = _.isArray(replace) ? replace : [replace];
			if (search.test(filename)) {
				match = true;
				replace.forEach(function (r) {
					newPaths.push(dir + filename.replace(search, r));
				});
			}
		});
		if (newPaths.length < 1) {
			newPaths.push(dir + filename);
		}
		return newPaths;
	}

};
