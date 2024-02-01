import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Chart from 'chart.js/auto';
import { thresholdPlugin } from './plugins/thresholdPlugin.js';

Chart.register(thresholdPlugin);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
