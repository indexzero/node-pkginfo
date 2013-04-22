/*
 Copyright (c) 2010 Charlie Robbins.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @license pkginfo.js (c) 2011 Charlie Robbins
 * Released under the MIT license
 * see: https://github.com/indexzero/node-pkginfo for details
 */
module.exports = (function(module) {
    'use strict';

    var fs = require('fs'),
        path = require('path');

    //
    // ### function pkginfo ([options, 'property', 'property' ..])
    // #### @pmodule {Module} Parent module to read from.
    // #### @options {Object|Array|string} **Optional** Options used when exposing properties.
    // #### @arguments {string...} **Optional** Specified properties to expose.
    // Exposes properties from the package.json file for the parent module on 
    // it's exports. Valid usage:
    //
    // `require('pkginfo')()`
    //
    // `require('pkginfo')('version', 'author');`
    //
    // `require('pkginfo')(['version', 'author']);`
    //
    // `require('pkginfo')({ include: ['version', 'author'] });`
    //
    /**
     * @param {Module} pmodule
     * @param {Object.<string,*>|Array.<string>|string} options
     * @returns {Function.<pkginfo>}
     */
    function pkginfo(pmodule, options) {
        var args = [].slice.call(arguments, 2).filter(function (arg) {
            return typeof arg === 'string';
        });

        //
        // **Parse variable arguments**
        //
        if (Array.isArray(options)) {
            //
            // If the options passed in is an Array assume that
            // it is the Array of properties to expose from the
            // on the package.json file on the parent module.
            //
            options = { 'include': options };
        }
        else if (typeof options === 'string') {
            //
            // Otherwise if the first argument is a string, then
            // assume that it is the first property to expose from
            // the package.json file on the parent module.
            //
            options = { 'include': [options] };
        }

        //
        // **Setup default options**
        //
        options = options || {};

        // ensure that includes have been defined
        options['include'] = options['include'] || [];

        if (args.length > 0) {
            //
            // If additional string arguments have been passed in
            // then add them to the properties to expose on the 
            // parent module. 
            //
            options['include'] = options['include'].concat(args);
        }

        var pkg = pkginfo.read(pmodule, options.dir)['package'];
        Object.keys(pkg).forEach(function (key) {
            if (options['include'].length > 0 && !~options['include'].indexOf(key)) {
                return;
            }

            if (!pmodule.exports[key]) {
                pmodule.exports[key] = pkg[key];
            }
        });

        return pkginfo;
    }

    //
    // ### function find (dir)
    // #### @pmodule {Module} Parent module to read from.
    // #### @dir {string} **Optional** Directory to start search from.
    // Searches up the directory tree from `dir` until it finds a directory
    // which contains a `package.json` file. 
    //
    /**
     * @param {Module} pmodule
     * @param {string=} dir
     * @returns {string}
     * @expose
     */
    pkginfo.find = function (pmodule, dir) {
        if (!dir) {
            dir = path.dirname(pmodule.filename);
        }

        var files = fs.readdirSync(dir);

        if (~files.indexOf('package.json')) {
            return path.join(dir, 'package.json');
        }

        if (dir === '/') {
            throw new Error('Could not find package.json up from: ' + dir);
        }
        else if (!dir || dir === '.') {
            throw new Error('Cannot find package.json from unspecified directory');
        }

        return pkginfo.find(pmodule, path.dirname(dir));
    };

    //
    // ### function read (pmodule, dir)
    // #### @pmodule {Module} Parent module to read from.
    // #### @dir {string} **Optional** Directory to start search from.
    // Searches up the directory tree from `dir` until it finds a directory
    // which contains a `package.json` file and returns the package information.
    //
    /**
     * @param {Module} pmodule
     * @param {string=} dir
     * @returns {{dir: string, package: *}}
     * @expose
     */
    pkginfo.read = function (pmodule, dir) {
        dir = pkginfo.find(pmodule, dir);

        var data = fs.readFileSync(dir).toString();

        return {
            'dir': dir,
            'package': JSON.parse(data)
        };
    };

    //
    // Call `pkginfo` on this module and expose version.
    //
    pkginfo(module, {
        'dir': __dirname,
        'include': ['version'],
        'target': pkginfo
    });
    
    return pkginfo;

})(module);
