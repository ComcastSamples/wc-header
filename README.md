# Step 1

`npm start` this project, your browser should open to http://localhost:3001

Make sure you have the [React HN app](https://github.com/ComcastSamples/reacthnpwa) also up and running on http://localhost:3000

1. Get the wc-footer added to the React app in index.html

  * Add script tag to include components.js from this project
  * Add <wc-footer> tag
2. Optimize for production

  * Open package.json add build script `cross-env NODE_ENV=production rollup -c rollup.config.js`
  * Add uglify and only have it run if NODE_ENV is production
  * Dont run browsersync on build
  * Be sure to remove the comments by adding {comments:false}
  * Add a sourcemap for easier debugging (check rollup docs)

When you're done, `git checkout -f step2`

### Questions?

Please reach out to us on Twitter, we're happy to help :-)

—[John](https://twitter.com/JohnRiv) & [Chris](https://twitter.com/chiefcll)
