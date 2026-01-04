import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import Plywood from './pages/Plywood';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import FloatingWA from './components/FloatingWA'; // <--- 1. Import New Component

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

function App() {
    const location = useLocation();

    return (
        <>
            {/* 2. Add Floating Button Here (Outside Routes so it stays persistent) */}
            <FloatingWA />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                    <Route path="/catalog" element={<PageWrapper><Catalog /></PageWrapper>} />
                    <Route path="/plywood" element={<PageWrapper><Plywood /></PageWrapper>} />
                    <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                    <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />

                    <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;