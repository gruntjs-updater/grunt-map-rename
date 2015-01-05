/*
 * grunt-map-rename
 * https://github.com/b263/grunt-map-rename
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

function MapRenamer(grunt, files, map) {
	this.grunt = grunt;
	this.files = files;
	this.map = map;
}

MapRenamer.prototype = {

	getNewPaths: function (src, map) {

		var dir = src.replace(/[^\/]+$/, ''),
			filename = src.replace(/^.*[\/]/, ''),
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

	},

	run: function () {
		var self = this;
		this.files.forEach(function (f) {
			f.src.filter(function (filepath) {
				if (!self.grunt.file.exists(filepath)) {
					self.grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).forEach(function (filepath) {
				var newPaths = self.getNewPaths(filepath, self.map),
					isRenamed = false;
				newPaths.forEach(function (newPath) {
					if (filepath !== newPath) {
						self.grunt.file.copy(filepath, newPath);
						isRenamed = true;
					}
				});
				if (isRenamed) {
					self.grunt.file.delete(filepath);
				}
			});
		});
	}

};

module.exports = MapRenamer;