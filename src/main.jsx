import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { initAnalytics } from '@/lib/analytics'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Loads pixels only if the visitor previously accepted analytics cookies.
initAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
