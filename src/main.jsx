import React from 'react';
import ReactDOM from 'react-dom/client';

import ProjectsContextProvider from './store/projects-context';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectsContextProvider>
      <App />
    </ProjectsContextProvider>
  </React.StrictMode>
);
