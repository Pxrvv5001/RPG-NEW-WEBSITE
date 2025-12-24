import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom' // Change this import

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Swap BrowserRouter for HashRouter */}
        <HashRouter>
            <ScrollToTop />
            <App />
        </HashRouter>
    </React.StrictMode>,
)