# userflow-electron

Electron support for [Userflow](https://userflow.com/).

## Installation

```sh
npm install userflow.js userflow-electron
```

## Quick start

Add this to your renderer process:

```js
const {remote} = require('electron')
const userflow = require('userflow.js')
const {startDevServer} = require('userflow-electron')

function startUserflow() {
  userflow.init(USERFLOW_TOKEN)
  userflow.identify(USER_ID, {
    name: USER_NAME,
    email: USER_EMAIL,
    signed_up_at: USER_SIGNED_UP_AT
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

**Important**: Since Electron v10.0, you must set `enableRemoteModule` to `true` when you instantiate your `BrowserWindow` to allow the renderer process to access `electron.remote` in order to read command line flags. Example:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

## Detailed instructions

### Load and configure Userflow.js

In the renderer process, initialize Userflow.js. Then identify a user. Import the `userflow` object from [`userflow.js`](https://github.com/userflow/userflow.js).

Import `userflow`:

```js
const userflow = require('userflow.js')
```

As soon you have the user's information handy:

```js
userflow.init(USERFLOW_TOKEN)
userflow.identify(USER_ID, {
  name: USER_NAME,
  email: USER_EMAIL,
  signed_up_at: USER_SIGNED_UP_AT
})
```

Check [Userflow.js docs](https://github.com/userflow/userflow.js) for more info.

### Adjust your Content-Security-Policy (CSP)

If your app uses Content-Security-Policy (CSP), make sure you include [Userflow's required directives](https://userflow.com/docs/dev/csp).

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

If you normally start your app with `npm start`/`yarn start` (e.g. if using electron-forge), you need to add `--userflow-dev-server` to your `package.json`'s `start` script instead. Example:

```json
  "scripts": {
    "start": "electron-forge start --userflow-dev-server"
  }
```

If needed, you can stop the server later by running the exported `stopDevServer` function.
