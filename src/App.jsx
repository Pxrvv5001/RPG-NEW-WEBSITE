import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react'; // <--- IMPORT THIS
import FloatingWA from './components/FloatingWA';
import ScrollProgress from './components/ScrollProgress';

const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Plywood = lazy(() => import('./pages/Plywood'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Calculator = lazy(() => import('./pages/Calculator'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

const PageLoader = () => (
    // Fixed: Ensure this matches your charcoal theme
    <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-[#1c1c1c]">
        <div className="w-12 h-12 border-4 border-[#d97706] border-t-transparent rounded-full animate-spin"></div>
    </div>
);

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

    const scrollToTop = () => {
        // Instant scroll reset for route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    return (
        // ▼▼▼ WRAP EVERYTHING IN REACT LENIS ▼▼▼
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>

            <ScrollProgress />
            <FloatingWA />

            <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                        <Route path="/catalog" element={<PageWrapper><Catalog /></PageWrapper>} />
                        <Route path="/plywood" element={<PageWrapper><Plywood /></PageWrapper>} />
                        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
                        <Route path="/calculator" element={<PageWrapper><Calculator /></PageWrapper>} />

                        <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
                        <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />

                        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                    </Routes>
                </AnimatePresence>
            </Suspense>

        </ReactLenis>
    );
}

export default App;