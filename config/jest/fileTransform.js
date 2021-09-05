// This is a custom Jest transformer that returns the basename of a file.
// https://jestjs.io/docs/webpack

const path = require('path')

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
  },
}
