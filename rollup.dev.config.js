const browsersync = require('rollup-plugin-browsersync');
const rollupConfig = require('./rollup.config.js');

let configs = ['components.js', 'components.es5.js'].map(input => {
  let transpile = input.includes('.es5');

  return rollupConfig.components({input, transpile, minify: false});
});

let browsersyncOptions = {
  server: 'dist',
  notify: false,
  host: '0.0.0.0',
  port: '3001'
};

configs[0].plugins.push(browsersync(browsersyncOptions));

module.exports = configs;
