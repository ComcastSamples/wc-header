const rollupConfig = require('./rollup.config.js');

let configs = ['components.js', 'components.es5.js'].map(input => {
  let transpile = input.includes('.es5');

  return rollupConfig.components({input, transpile, minify: true});
});

module.exports = configs;
