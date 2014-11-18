/**
 * @fileoverview Minimal environment to compiler pkginfo.
 * @externs
 */

/**
 * @param {string} moduleName
 * @returns {*}
 */
var require = function(moduleName) {};

/**
 * @type {string}
 */
var __dirname;

/**
 * @type {Object.<string,*>}
 */
var fs = {};

/**
 * @param {string} dir
 * @return {Array.<string>}
 */
fs.readdirSync = function(dir) {};

/**
 * @param {string} dir
 * @return {Buffer}
 */
fs.readFileSync = function(dir) {};

/**
 * @constructor
 * @extends Array
 */
var Buffer = function() {};

/**
 * @constructor
 * @private
 */
var Module = function() {};

/**
 * @type {string}
 */
Module.prototype.filename;

/**
 * @type {*}
 */
Module.prototype.exports;

/**
 * @type {Module}
 */
var module;

// ccjs lib/pkginfo.js
// --warning_level=VERBOSE
// --compilation_level=ADVANCED_OPTIMIZATIONS
// --externs=externs/minimal-env.js
// --externs=externs/pkginfo.js > pkginfo.min.js
