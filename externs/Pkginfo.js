/**
 * @fileoverview Definitions for pkginfo.js.
 * @see https://github.com/indexzero/node-pkginfo
 * @externs
 * @author Daniel Wirtz <dcode@dcode.io>
 */

/**
 BEGIN_NODE_INCLUDE
 var pkginfo = require('pkginfo');
 END_NODE_INCLUDE
 */

/**
 * @param {Object|Array|string=} pmodule
 * @param {...[string]} options
 */
var pkginfo = function (pmodule, options) {};

/**
 * @param {Module} pmodule
 * @param {string=} dir
 */
pkginfo.find = function (pmodule, dir) {};

/**
 * @param {Module} pmodule
 * @param {string=} dir
 * @returns {{dir: string, package: *}}
 * @expose
 */
pkginfo.read = function (pmodule, dir) {};
