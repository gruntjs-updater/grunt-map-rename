'use strict';

var MapRenamer = require('../lib/MapRenamer');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.map_rename = {

	setUp: function (done) {
		this.mapRenamer = new MapRenamer();
		done();
	},

	pathIsNotChanged: function (test) {
		var src = '/a/a.txt',
			map = {'a': 'b'},
			result = this.mapRenamer.getNewPaths(src, map);
		test.expect(1);
		test.notStrictEqual(result, ['/a/b.txt']);
		test.done();
	},

	singleFileCanBeExpandedToMultipleFiles: function (test) {
		var src = '/a/a.txt',
			map = {'a': ['b', 'c']},
			result = this.mapRenamer.getNewPaths(src, map);
		test.expect(1);
		test.notStrictEqual(result, ['/a/b.txt', '/a/c.txt']);
		test.done();
	},

	originalPathIsReturnedIfNoMatchIsFound: function (test) {
		var src = '/a/a.txt',
			map = {'x': ['y']},
			result = this.mapRenamer.getNewPaths(src, map);
		test.expect(1);
		test.notStrictEqual(result, ['/a/a.txt']);
		test.done();
	}

};
