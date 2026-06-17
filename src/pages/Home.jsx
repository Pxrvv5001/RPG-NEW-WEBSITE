import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import OurStory from "../components/OurStory";
import BusinessGrid from "../components/BusinessGrid";
import InfiniteMarquee from "../components/InfiniteMarquee";
import ProductAtelier from "../components/ProductAtelier";
import WhyChooseUs from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import WorldImportMap, { importRoutes } from "../components/WorldImportMap";

const INTRO_DURATION = 2800; // Must match Hero's branding duration

// Module-level flag — survives navigations, resets on full page reload
let hasShownHeader = false;

const Home = () => {
    const [showHeader, setShowHeader] = useState(() => hasShownHeader);

    useEffect(() => {
        if (hasShownHeader) return;
        const timer = setTimeout(() => {
            setShowHeader(true);
            hasShownHeader = true;
        }, INTRO_DURATION);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="font-sans antialiased text-gray-900 bg-white">
            <Helmet>
                <title>R.P. Goyal & Sons | Premier Timber Importers & Sawmill</title>
                <meta name="description" content="Importers of Teak, Pine, and Meranti in Karnal, Haryana. We offer timber supply, plywood manufacturing, and sawmill services." />
            </Helmet>

            <AnimatePresence>
                {showHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Header />
                    </motion.div>
                )}
            </AnimatePresence>

            <Hero />

            {/* 1. Dark Strip: Adds credibility immediately */}
            <Stats />

            {/* 2. White Section: Split Layout (Image Left/Text Right) */}
            <OurStory />

            {/* ━━━ WORLD IMPORT MAP (Moved from About) ━━━ */}
            <section className="py-14 md:py-24 bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-500 overflow-hidden relative">
                {/* Grain overlay */}
                <div className="absolute inset-0 grain-overlay opacity-50 dark:opacity-100" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16"
                    >
                        <h4 className="text-[#d97706] font-bold uppercase tracking-widest text-xs mb-3 md:mb-4">
                            Global Sourcing Network
                        </h4>
                        <h2 className="text-2xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                            We Import From 6 Countries
                        </h2>
                        <p className="text-gray-600 dark:text-stone-500 text-xs md:text-sm max-w-lg mx-auto">
                            Our direct sourcing relationships span three continents — delivering the world's finest timber to Kandla Port, Gujarat.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <WorldImportMap />
                    </motion.div>

                    {/* Legend pills — desktop only (mobile cards already show this info) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                        className="hidden md:flex flex-wrap justify-center gap-3 mt-12"
                    >
                        {importRoutes.map((route) => (
                            <div
                                key={route.id}
                                className="flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 text-xs text-gray-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-sm dark:shadow-none transition-all cursor-default"
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: route.color }}
                                />
                                <span className="font-semibold">{route.flag} {route.country}</span>
                                <span className="text-gray-300 dark:text-white/40">—</span>
                                <span style={{ color: route.color }}>{route.wood}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* 3. Off-White Section: The Core Business Grid */}
            <BusinessGrid />

            {/* 4. Orange Accent Strip: Adds horizontal movement */}
            <InfiniteMarquee />

            {/* 5. Dark Section: Premium Products */}
            <ProductAtelier />

            {/* 6. White Section: Features Grid */}
            <WhyChooseUs />

            {/* 7. CTA & Footer */}
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Home;