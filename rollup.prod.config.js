const rollupConfig = require('./rollup.config.js');

const configs = ['components.js', 'components.es5.js'].map((input) => {
  const transpile = input.includes('.es5');

  return rollupConfig.components({ input, transpile, minify: true });
});

module.exports = configs;
