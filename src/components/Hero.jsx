import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "../assets/timber-yard-stock-karnal.jpg";
import TimberParticles from "./TimberParticles";
import MagneticButton from "./MagneticButton";

const INTRO_DURATION = 2800; // Branding phase (ms)
const REVEAL_DELAY = 0.6;   // Seconds after branding fades for hero content to start

// Module-level flag — survives navigations, resets on full page reload
let hasPlayedBranding = false;

const Hero = () => {
    const [phase, setPhase] = useState(() => hasPlayedBranding ? "hero" : "branding");

    useEffect(() => {
        if (hasPlayedBranding) return;
        const timer = setTimeout(() => {
            setPhase("hero");
            hasPlayedBranding = true;
        }, INTRO_DURATION);
        return () => clearTimeout(timer);
    }, []);

    const HEADER_OFFSET = 72; // px — matches sticky header height

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
    };

    const scrollToDivisions = () => scrollToSection("divisions");
    const scrollToStats     = () => scrollToSection("stats");

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
                4. BRANDING OVERLAY (Splash Phase) — Vertical Stack Wipe
               ======================================== */}
            <AnimatePresence>
                {phase === "branding" && (
                    <motion.div
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
                        exit={{ opacity: 0, y: -24, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
                    >
                        {/* LINE 1 — "R.P. GOYAL" slides up through a clip mask */}
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: "105%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="block text-[2rem] sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-[0.06em] leading-none">
                                    R.P. GOYAL
                                </span>
                            </motion.div>
                        </div>

                        {/* Orange rule — draws left to right */}
                        <div className="overflow-hidden w-full flex justify-center my-3 md:my-4">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                className="h-[1.5px] w-28 sm:w-36 md:w-48 bg-gradient-to-r from-transparent via-[#d97706] to-transparent origin-left"
                            />
                        </div>

                        {/* LINE 2 — "& SON'S" slides up through its own clip mask */}
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: "105%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 0.85, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="block text-[1.4rem] sm:text-3xl md:text-5xl font-serif font-light text-white tracking-[0.18em] sm:tracking-[0.22em] leading-none">
                                    &amp;&nbsp;
                                    <span className="text-[#d97706] font-semibold">SON'S</span>
                                </span>
                            </motion.div>
                        </div>

                        {/* Pvt. Ltd. — drifts up last */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 0.4, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.55 }}
                            className="text-[9px] sm:text-[11px] text-white/60 uppercase tracking-[0.3em] font-sans font-light mt-4 md:mt-5"
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

                        {/* Word-by-word H1 reveal via clip-path mask */}
                        <div
                            className="mb-4 md:mb-6"
                            aria-label="Timber Importers & Sawmill in Karnal & Gandhidham"
                        >
                            {/* Line 1 */}
                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-0">
                                {["Timber", "Importers", "&", "Sawmill"].map((word, i) => (
                                    <div key={i} className="overflow-hidden">
                                        <motion.span
                                            initial={{ y: "110%" }}
                                            animate={{ y: "0%" }}
                                            transition={{
                                                duration: 0.7,
                                                delay: REVEAL_DELAY + 0.3 + i * 0.08,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="block text-4xl md:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg"
                                        >
                                            {word}
                                        </motion.span>
                                    </div>
                                ))}
                            </div>
                            {/* Line 2 */}
                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-0 mt-1">
                                {["in", "Karnal", "&", "Gandhidham"].map((word, i) => (
                                    <div key={i} className="overflow-hidden">
                                        <motion.span
                                            initial={{ y: "110%" }}
                                            animate={{ y: "0%" }}
                                            transition={{
                                                duration: 0.7,
                                                delay: REVEAL_DELAY + 0.55 + i * 0.08,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="block text-4xl md:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg"
                                        >
                                            {word}
                                        </motion.span>
                                    </div>
                                ))}
                            </div>
                        </div>

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
                            <MagneticButton strength={0.4}>
                                <button
                                    onClick={scrollToDivisions}
                                    className="inline-block px-8 py-4 md:py-3 bg-[#d97706] text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:bg-[#b45309] transition-all duration-300 rounded md:rounded-none cursor-pointer border-none shadow-lg"
                                >
                                    Explore Divisions
                                </button>
                            </MagneticButton>
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