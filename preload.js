const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  // Expõe as versões do Node, Chrome e Electron
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

// Expondo o contexto pro objeto global "window"
// no client
contextBridge.exposeInMainWorld('testando', {
  fazerBarulhinho: (arg) => ipcRenderer.invoke('fazerBarulhinho', arg),
});
