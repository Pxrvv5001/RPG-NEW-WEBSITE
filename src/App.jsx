import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog'; // Timber Page
import Plywood from './pages/Plywood'; // New Plywood Page
import Services from './pages/Services'; // New Services Page

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog" element={<Catalog />} />
            {/* New Routes */}
            <Route path="/plywood" element={<Plywood />} />
            <Route path="/services" element={<Services />} />
        </Routes>
    );
}

export default App;