
var pkginfo = require('./../../lib/pkginfo')({
  include: ['version', 'author']
});

exports.someFunction = function () {
  console.log('some logic');
};

console.dir(Object.keys(module.exports));