import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <HashRouter>
                {/* ScrollToTop removed from here - moved logic to App.jsx */}
                <App />
            </HashRouter>
        </HelmetProvider>
    </React.StrictMode>,
)