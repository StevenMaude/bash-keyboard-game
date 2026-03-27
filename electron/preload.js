/**
 * electron/preload.js — runs in renderer context before page scripts.
 *
 * We keep this minimal: contextIsolation is on, so only explicitly
 * exposed APIs cross the boundary. The game needs nothing from Node,
 * so we expose a single read-only flag that lets renderer code detect
 * whether it's running inside Electron.
 */

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  /** true when the renderer is loaded inside Electron */
  isElectron: true,
});
