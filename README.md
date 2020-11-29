# Step 1

`npm start` this project, your browser should open to http://localhost:3001

Make sure you have the [React HN app](https://github.com/ComcastSamples/reacthnpwa) also up and running on http://localhost:3000

1. Get the wc-footer added to the React app in index.html 

  - Add a `<script>` tag to include components.js from this project 
  - Add a `<wc-footer>` tag 

2. Optimize for production 

  * Open package.json & add this `build` script: `cross-env NODE_ENV=production rollup -c rollup.config.js`
  * Open rollup.config.js & add [rollup-plugin-babel-minify](https://github.com/Comandeer/rollup-plugin-babel-minify) and only have it run if `NODE_ENV` is `production`
  * Don't run browsersync when `build` script is run
  * Be sure to remove the comments by adding `{comments:false}`
  * Add a sourcemap for easier debugging (check [Rollup docs](https://rollupjs.org/guide/en/#big-list-of-options))

When you're done, `git checkout -f step2`

### Questions?

Please reach out to us on Twitter, we're happy to help :-)

—[John](https://twitter.com/JohnRiv) & [Chris](https://twitter.com/chiefcll)
