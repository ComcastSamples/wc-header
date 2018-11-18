/* eslint import/no-extraneous-dependencies:[0] */
const browsersync = require('rollup-plugin-browsersync');
const rollupConfig = require('./rollup.config.js');

const configs = ['components.js', 'components.es5.js'].map((input) => {
  const transpile = input.includes('.es5');

  return rollupConfig.components({ input, transpile, minify: false });
});

const browsersyncOptions = {
  server: 'dist',
  notify: false,
  host: '0.0.0.0',
  port: '3001',
  serveStatic: [{
    route: '/node_modules',
    dir: 'node_modules',
  }],
};

configs[0].plugins.push(browsersync(browsersyncOptions));

module.exports = configs;
