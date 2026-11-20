import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/bricolage-grotesque';
import App from './App.jsx';
import './styles/global.css';

// Habilita las animaciones de aparición solo cuando JavaScript está activo.
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
