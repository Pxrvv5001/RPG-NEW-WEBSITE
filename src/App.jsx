import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import Plywood from './pages/Plywood';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound'; // Import the new page

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/plywood" element={<Plywood />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />

            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;