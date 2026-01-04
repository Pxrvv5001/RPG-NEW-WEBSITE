import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async' // <--- 1. IMPORT THIS
import ScrollToTop from './components/ScrollToTop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* 2. WRAP EVERYTHING IN HELMETPROVIDER */}
        <HelmetProvider>
            <HashRouter>
                <ScrollToTop />
                <App />
            </HashRouter>
        </HelmetProvider>
    </React.StrictMode>,
)