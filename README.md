[![NPM](https://img.shields.io/npm/v/grunt-map-rename.svg)](https://www.npmjs.com/package/grunt-map-rename)
[![GitHub](https://img.shields.io/github/tag/b263/grunt-map-rename.svg)](https://github.com/b263/grunt-map-rename)
[![Travis CI](https://img.shields.io/travis/b263/grunt-map-rename.svg)](https://travis-ci.org/b263/grunt-map-rename)

# grunt-map-rename

> Rename files according to mapping data

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-map-rename --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-map-rename');
```

## The "map_rename" task

### Overview
In your project's Gruntfile, add a section named `map_rename` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  map_rename: {
    options: {
      map: 'path/to/map.json'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Required options

#### **`map`** (String)

Path to JSON file that contains the mapping data.

Example file content:

```js
{
  "01": "myfile",
  "02": [
    "duplicate_a",
    "duplicate_b"
  ]
}
```