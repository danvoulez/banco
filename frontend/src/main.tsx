import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './state'
import Shell from './shell'
createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AppProvider><Shell/></AppProvider></React.StrictMode>
)
