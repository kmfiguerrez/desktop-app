/*
  Extending the window object to match the exposed APIs in the preload.js
  See: https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
*/

export interface IElectronAPI {
  node: () => string
  chrome: () => string
  electron: string
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}