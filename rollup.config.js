const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-terser');

function components({ input, transpile = false, minify = true }) {
  const outputName = input.replace('.js', '');

  const config = {
    input: `${input}`,
    output: {
      name: 'CX',
      format: 'iife',
      file: `dist/${outputName}.js`,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false,
      }),
      replace({
        exclude: 'node_modules/**',
        SAMPLE: '',
      }),
    ],
  };

  if (minify) {
    config.plugins.push(terser({ output: {
      comments: function (node, comment) {
        var text = comment.value;
        var type = comment.type;
        if (type == "comment2") {
          // multiline comment
          return /@preserve|@license|@cc_on/i.test(text);
        }
      },
    }, }));
  }

  return config;
}

module.exports = { components };
