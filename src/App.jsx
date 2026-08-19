import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Toaster } from 'react-hot-toast';

import FloatingWA from './components/FloatingWA';
import ScrollProgress from './components/ScrollProgress';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

const INTRO_DURATION = 2800; // Must match Hero's branding duration


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
const About = lazy(() => import('./pages/About'));

const PageLoader = () => (
    <div className="h-screen w-full bg-[#0a0a0a]"></div>
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
    const isHome = location.pathname === '/';
    const [brandingDone, setBrandingDone] = useState(() => {
        if (!isHome) return true;
        return sessionStorage.getItem('brandingDone') === 'true';
    });

    useEffect(() => {
        if (brandingDone || !isHome) return;
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            setBrandingDone(true);
            sessionStorage.setItem('brandingDone', 'true');
            document.body.style.overflow = '';
        }, INTRO_DURATION);
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, [isHome]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    return (
        <ThemeProvider>
        <CartProvider>
            <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>

                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        style: {
                            background: '#1c1c1c',
                            color: '#fff',
                            border: '1px solid #d97706',
                            padding: '16px',
                            fontSize: '14px',
                        },
                        success: {
                            iconTheme: {
                                primary: '#d97706',
                                secondary: '#fff',
                            },
                        },
                    }}
                />

                {brandingDone && <ScrollProgress />}
                {brandingDone && <FloatingWA />}

                <Suspense fallback={<PageLoader />}>
                    <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
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
        </CartProvider>
        </ThemeProvider>
    );
}

export default App;