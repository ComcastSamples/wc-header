const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const browsersync = require('rollup-plugin-browsersync');
const uglify = require('rollup-plugin-babel-minify');

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

let config = {
  input: 'components.js',
  output: {
    name: 'WC',
    format: 'iife',
    file: `dist/components.js`,
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
      sourceMap: false,
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify({comments: false}));
} else {
  config.plugins.push(browsersync(browsersyncOptions));
}

export default config;
