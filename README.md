# Step 2

## A Wild wc-header Appears!

1. Add `wc-header` to the [components.js](/components.js) file
2. Open [Navigation.js](https://github.com/ComcastSamples/reacthnpwa/blob/master/src/containers/Navigation/Navigation.js) in [reacthnpwa](https://github.com/ComcastSamples/reacthnpwa) and replace the navigation wrappers with `<wc-header>`. (Keep the `<li>` tags as children of wc-header)
3. Open [wc-header.js](/wc-header.js) and add global styles for `wc-header a`
4. [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) up the anchor styles and share them with wc-footer - [lines 34-53 in wc-footer.js](/wc-footer.js#L34-L53) are the same!

When you're done, `git checkout -f step3`

### Questions?

Please reach out to us on Twitter, we're happy to help :-)

...—[John](https://twitter.com/JohnRiv) & [Chris](https://twitter.com/chiefcll)
