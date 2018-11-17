const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-babel-minify');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');

function components({input, transpile = false, minify = true}) {
  let outputName = input.replace('.js', '');

  let config = {
    input: `${input}`,
    output: {
      name: 'CX',
      format: 'iife',
      file: `dist/${outputName}.js`
    },
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false
      }),
      replace({
        exclude: 'node_modules/**',
        SAMPLE: '',
      })
    ]
  };

  if (transpile) {
    config.plugins.push(babel());
  }

  if (minify) {
    config.plugins.push(uglify({comments: false}));
  }

  return config;
}

module.exports = {components};
