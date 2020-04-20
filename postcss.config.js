module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 10'],
      cascade: true,
      remove: true
    }),
    require('css-mqpacker')()
  ]
}
