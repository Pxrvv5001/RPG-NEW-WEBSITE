import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // Check this import

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* The App must be inside BrowserRouter */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)