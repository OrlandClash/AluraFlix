import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Panel from './Componentes/panel';
import NuevoVideo from './Componentes/NuevoVideo';
import ErrorBoundary from './Componentes/ErrorBoundary';
import { VideoProvider } from './VideoContext';
import backgroundImage from './img/Background.jpg'; // Importa la imagen

const root = ReactDOM.createRoot(document.getElementById('root'));

// Aplica el fondo al body usando estilo en línea
document.body.style.backgroundImage = `url(${backgroundImage})`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundAttachment = 'fixed';
document.body.style.backgroundPosition = 'center';
document.body.style.margin = '0';
document.body.style.padding = '0';

root.render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <VideoProvider>
          <Routes>
            <Route path="/*" element={<Panel />} />
            <Route path="/nuevo-video" element={<NuevoVideo />} />
          </Routes>
        </VideoProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);