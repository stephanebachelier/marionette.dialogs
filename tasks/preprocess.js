module.exports = {
  bundle: {
    src: ['lib/index.js'],
    dest: 'dist/<%= pkg.name.replace(/.js$/, "") %>.js'
  }
};
