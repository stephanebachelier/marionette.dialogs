var path = require('path');

module.exports = {
  options: {
    includePaths: ['node_modules/sass-bourbon/bourbon'],
    outputStyle: 'compressed'
  },
  dist: {
    files: {
      'dist/<%= pkg.name.replace(/.js$/, "") %>.css': 'lib/scss/dialogs.scss'
    }
  }
};
