const {remote} = require('electron')
const {loadUserflow} = require('userflow.js')
const WebSocket = require('ws')

let wss = null

/**
 * Starts a local WebSocket server, which Userflow's Flow Builder (running at
 * https://getuserflow.com) can connect to in order to preview flows in draft
 * mode.
 */
function startDevServer() {
  wss = new WebSocket.Server({port: 4059})
  wss.on('connection', ws => {
    if (!window.userflow) {
      console.error(
        'userflow-electron: startDevServer was run, a websocket connection was received, but userflow.js has not been loaded yet. Please run loadUserflow() first.'
      )
      return
    }
    ws.on('message', data => {
      const message = JSON.parse(data)
      if (message.kind === 'userflow-electron:show') {
        remote.getCurrentWindow().show()
      }
    })
    window.userflow._setBuilderMessenger(new WebSocketBuilderMessenger(ws))
  })
}

/**
 * Stops the local WebSocket server.
 */
function stopDevServer() {
  if (wss) {
    wss.close()
    wss = null
  }
}

class WebSocketBuilderMessenger {
  constructor(ws) {
    this.ws = ws
  }

  destroy() {
    this.ws.close()
  }

  postMessage(message) {
    this.ws.send(JSON.stringify(message))
  }

  onMessage(onMessage) {
    const listener = data => {
      const message = JSON.parse(data)
      if (message.kind && message.kind.startsWith('userflow:')) {
        onMessage(message)
      }
    }
    this.ws.on('message', listener)
    return () => this.ws.off('message', listener)
  }
}

module.exports = {
  startDevServer,
  stopDevServer,

  // Re-export loadUserflow so that apps can just rely on userflow-electron
  loadUserflow
}
