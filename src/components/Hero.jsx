import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "../assets/timber-yard-stock-karnal.jpg";
import TimberParticles from "./TimberParticles";

const INTRO_DURATION = 2800; // Branding phase (ms)
const REVEAL_DELAY = 0.6;   // Seconds after branding fades for hero content to start

const Hero = () => {
    const [phase, setPhase] = useState("branding"); // "branding" → "hero"

    useEffect(() => {
        const timer = setTimeout(() => setPhase("hero"), INTRO_DURATION);
        return () => clearTimeout(timer);
    }, []);

    const scrollToDivisions = () => {
        const element = document.getElementById("divisions");
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToStats = () => {
        const element = document.getElementById("stats");
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

            {/* 1. Background Image — always present, Ken Burns running */}
            <motion.img
                src={heroBg}
                alt="Timber Yard Stock in Karnal"
                className="absolute inset-0 w-full h-full object-cover hero-ken-burns"
                fetchPriority="high"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={phase === "hero" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.15 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {/* 2. Dark Overlay — starts fully opaque, then fades to 60% */}
            <motion.div
                className="absolute inset-0"
                initial={{ backgroundColor: "rgba(10, 10, 10, 1)" }}
                animate={phase === "hero"
                    ? { backgroundColor: "rgba(15, 23, 42, 0.60)" }
                    : { backgroundColor: "rgba(10, 10, 10, 1)" }
                }
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* 3. Particle Layer — fades in during hero phase */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={phase === "hero" ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <TimberParticles />
            </motion.div>

            {/* ========================================
                4. BRANDING OVERLAY (Splash Phase)
               ======================================== */}
            <AnimatePresence>
                {phase === "branding" && (
                    <motion.div
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5"
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {/* RPG Text */}
                        <motion.h2
                            initial={{ opacity: 0, letterSpacing: "0.8em", filter: "blur(8px)" }}
                            animate={{ opacity: 1, letterSpacing: "0.3em", filter: "blur(0px)" }}
                            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-5xl md:text-7xl font-serif font-bold text-white"
                        >
                            RPG
                        </motion.h2>

                        {/* Orange Line */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 80, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            className="h-[2px] bg-gradient-to-r from-transparent via-[#d97706] to-transparent"
                        />

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="text-[10px] md:text-xs text-white uppercase tracking-[0.4em] font-sans"
                        >
                            Pvt. Ltd.
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ========================================
                5. HERO CONTENT (Fades in after branding exits)
               ======================================== */}
            <AnimatePresence>
                {phase === "hero" && (
                    <motion.div
                        className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto -mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: REVEAL_DELAY }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: REVEAL_DELAY + 0.1 }}
                            className="text-[#d97706] text-xs md:text-base font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4"
                        >
                            Est. 2004 · Haryana, India
                        </motion.p>

                        {/* --- SEO CHANGE: OPTIMIZED H1 FOR LOCAL RANKING --- */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: REVEAL_DELAY + 0.3 }}
                            className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
                        >
                            Timber Importers & Sawmill<br /> in Karnal & Gandhidham
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: REVEAL_DELAY + 0.5 }}
                            className="text-gray-200 text-sm md:text-xl font-light mb-8 md:mb-10 max-w-xs md:max-w-2xl mx-auto leading-relaxed"
                        >
                            Premier importers of Teak, Pine, and Veneers. Bridging the gap between global forestry and Indian craftsmanship.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: REVEAL_DELAY + 0.7 }}
                        >
                            <button
                                onClick={scrollToDivisions}
                                className="inline-block px-8 py-4 md:py-3 bg-[#d97706] text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:bg-[#b45309] transition-all duration-300 rounded md:rounded-none cursor-pointer border-none shadow-lg"
                            >
                                Explore Divisions
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 6. Scroll Indicator */}
            {phase === "hero" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: REVEAL_DELAY + 1.5 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                    onClick={scrollToStats}
                >
                    <ChevronDown size={32} className="text-white/70 hover:text-[#d97706] transition-colors" />
                </motion.div>
            )}

        </section>
    );
};

export default Hero;