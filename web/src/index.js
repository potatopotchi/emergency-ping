import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import Tailwind CSS
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: For measuring performance
reportWebVitals();