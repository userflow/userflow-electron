# userflow-electron

Electron support for [Userflow](https://getuserflow.com/).

## Installation

```sh
npm install userflow-electron
```

## Quick start

Add this to your renderer process:

```js
const {remote} = require('electron')
const {loadUserflow, startDevServer} = require('userflow-electron')

async function startUserflow() {
  const userflow = await loadUserflow()
  userflow.init(USERFLOW_TOKEN)
  userflow.identify(USER_ID, {
    name: USER_NAME,
    email: USER_EMAIL,
    signedUpAt: USER_SIGNED_UP_AT
  })

  if (remote.process.argv.some(v => v === '--userflow-dev-server')) {
    startDevServer()
  }
}

startUserflow()
```

When developing your Electron app locally, start it with the `--userflow-dev-server` command line flag, e.g.:

```sh
electron . --userflow-dev-server
```

## Detailed instructions

### Load and configure Userflow.js

In the renderer process, load and initialize Userflow.js. Then identify a user. `userflow-electron` re-exports `loadUserflow` from [`userflow.js`](https://github.com/getuserflow/userflow.js) for convenience:

```js
const {loadUserflow} = require('userflow-electron')

userflow = await loadUserflow()
userflow.init(USERFLOW_TOKEN)
userflow.identify(USER_ID, {
  name: USER_NAME,
  email: USER_EMAIL,
  signedUpAt: USER_SIGNED_UP_AT
})
```

Check [Userflow.js docs](https://github.com/getuserflow/userflow.js) for more info.

### Adjust your Content-Security-Policy (CSP)

If your app uses Content-Security-Policy (CSP), make sure you include [Userflow's required directives](https://getuserflow.com/docs/dev/csp).

### Enable flow previews in development

To be able to preview flows locally and use Userflow's element selector tool, the exported `startDevServer` function must be run.

**Make sure to only do this locally on your own machine. This code should NOT be run on end-users' machines.**

`startDevServer` will start a local WebSocket server, which Userflow's Flow Builder can communicate with.

The recommended way is to start your app with a command line flag, e.g. `--userflow-dev-server`, which a renderer process can read to start this behavior. Example:

```js
const {remote} = require('electron')
const {startDevServer} = require('userflow-electron')

if (remote.process.argv.some(v => v === '--userflow-dev-server')) {
  startDevServer()
}
```

Then run your app with e.g.:

```sh
electron . --userflow-dev-server
```

If needed, you can stop the server later by running the exported `stopDevServer` function.