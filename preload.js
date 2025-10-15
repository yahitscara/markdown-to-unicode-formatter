import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  readClipboard: () => ipcRenderer.invoke('clipboard-read'),
  writeClipboard: (text) => ipcRenderer.invoke('clipboard-write', text)
});
