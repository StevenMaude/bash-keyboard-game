const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('desktopEnvironment', {
  runtime: 'electron'
})
