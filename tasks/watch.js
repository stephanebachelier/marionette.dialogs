module.exports = {
  gruntfile: {
    files: '<%= jshint.gruntfile.src %>',
    tasks: [
      'jshint:gruntfile',
      'jscs:gruntfile',
      'lintspaces:gruntfile'
    ]
  },
  lib: {
    files: ['<%= jshint.lib.src %>', '<%= sass.dist.files.src %>'],
    tasks: [
      'build'
    ]
  },
  test: {
    files: '<%= jshint.test.src %>',
    tasks: [
      'jshint:test',
      'jscs:test',
      'lintspaces:test'
    ]
  }
};
