module.exports = {
  gruntfile: {
    files: '<%= jshint.gruntfile.src %>',
    tasks: [
      'jshint:gruntfile',
      'jscs:gruntfile',
      'lintspaces:gruntfile'
    ]
  },
  js: {
    files: ['<%= jshint.lib.src %>'],
    tasks: [
      'buildjs'
    ]
  },
  css: {
    files: ['<%= sass.dist.files.src %>'],
    tasks: [
      'buildcss'
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
