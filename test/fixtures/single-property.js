
var pkginfo = require('./../../lib/pkginfo')('version');

exports.someFunction = function () {
  console.log('some logic');
};

console.dir(Object.keys(module.exports));