'use strict';

var grunt = require('grunt'),
	fs = require('fs');

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
		done();
	},
	default: function (test) {
		test.expect(1);
		test.notStrictEqual(fs.readdirSync('tmp'), ['03.txt', 'duplicate_a.txt', 'duplicate_b.txt', 'myfile.txt']);
		test.done();
	}
};
